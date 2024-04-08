import json
import os
import pickle
from contextlib import contextmanager
from datetime import datetime
from typing import Any, Callable, Generator, cast, override

from psycopg2.extensions import connection as Connection
from psycopg2.extensions import cursor as Cursor
from psycopg2.pool import SimpleConnectionPool

from cpf.core.domain.aggregates.buckets.aggregate import Bucket
from cpf.core.domain.aggregates.domain_event import DomainEvent, DomainEventMeta, PrimitiveDict
from cpf.core.domain.aggregates.ladders.aggregate import Ladder
from cpf.core.ports.required.writemodels import Repository, AR


class EventStoreRepository(Repository[AR]):
    def __init__(
        self,
        aggregate_root_type: type[AR],
        connection_pool: SimpleConnectionPool,
        snapshot_policy: Callable[[AR], bool] | None = None,  # TODO: implement snapshot save/load
    ) -> None:
        self._aggregate_root_type = aggregate_root_type
        self._pool = connection_pool
        self._snapshot_policy = snapshot_policy

    @contextmanager
    def _get_connection(self) -> Generator[Connection, None, None]:
        conn = self._pool.getconn()
        try:
            yield conn
        finally:
            self._pool.putconn(conn)

    @staticmethod
    def _record_event(
        cursor: Cursor,
        aggregate_type: str,
        aggregate_id: str,
        event_type: str,
        event_data: dict[str, Any] | None,
        expected_event_count: int | None = None,
    ) -> tuple[int, datetime, int]:
        cursor.execute(
            "SELECT * FROM record_event(%s, %s, %s, %s, %s)",
            (
                aggregate_type,
                aggregate_id,
                event_type,
                json.dumps(event_data),
                expected_event_count,
            ),
        )
        # event_id, created_at, aggregate_event_count
        return cast(tuple[int, datetime, int], cursor.fetchone())

    @staticmethod
    def _save_snapshot(
        cursor: Cursor,
        aggregate_type: str,
        aggregate_id: str,
        last_event_id: int,
        serialized_aggregate: bytes,
    ):
        cursor.execute(
            "SELECT save_snapshot(%s, %s, %s, %s)",
            (aggregate_type, aggregate_id, last_event_id, serialized_aggregate),
        )

    @staticmethod
    def _serialize(model: AR) -> bytes:
        return pickle.dumps(model)

    @staticmethod
    def _deserialize(serialized_model: bytes) -> AR:
        return pickle.loads(serialized_model)

    @override
    def save(self, aggregate: AR) -> None:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                try:
                    event_count = aggregate.version
                    for event in aggregate.pending_events:
                        _, _, event_count = self._record_event(
                            cursor,
                            aggregate.aggregate_type(),
                            aggregate.aggregate_id,
                            event.event_type(),
                            event.to_primitive_dict(),
                            expected_event_count=event_count,
                        )
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    raise e

    @staticmethod
    def data_to_domain_event(type: str, data: PrimitiveDict | None) -> DomainEvent:
        event_class = DomainEventMeta.get_event_type(type)
        if event_class is None:
            raise ValueError(f"No event class found for type '{type}'")
        if data is None:
            return event_class()
        else:
            return event_class.from_primitive_dict(data)

    @staticmethod
    def domain_event_to_data(event: DomainEvent) -> PrimitiveDict:
        return event.to_primitive_dict()

    @override
    def load(self, id: str) -> AR | None:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "SELECT event_type, event_data FROM events "
                    "WHERE aggregate_type = %s AND aggregate_id = %s ORDER BY event_id ASC",
                    (self._aggregate_root_type.aggregate_type(), id),
                )
                events = cursor.fetchall()
                if not events:
                    return None
                domain_events = [
                    self.data_to_domain_event(str(event_type), event_data) for event_type, event_data in events
                ]
                aggregate = self._aggregate_root_type(id)
                for domain_event in domain_events:
                    aggregate.apply_event(domain_event)
                aggregate.version = len(domain_events)
                return aggregate

    @override
    def remove(self, aggregate: AR) -> None:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "DELETE FROM events WHERE aggregate_type = %s AND aggregate_id = %s",
                    (aggregate.aggregate_type(), aggregate.aggregate_id),
                )
                conn.commit()


connection_pool = SimpleConnectionPool(
    minconn=os.getenv("POSTGRES_MIN_CONNECTIONS", 1),
    maxconn=os.getenv("POSTGRES_MAX_CONNECTIONS", 10),
    host=os.getenv("POSTGRES_HOST"),
    port=os.getenv("POSTGRES_PORT", 5432),
    dbname=os.getenv("POSTGRES_DB"),
    user=os.getenv("POSTGRES_USER"),
    password=os.getenv("POSTGRES_PASSWORD"),
)


def ladder_repository_factory() -> Repository[Ladder]:
    return EventStoreRepository(Ladder, connection_pool)


def bucket_repository_factory() -> Repository[Bucket]:
    return EventStoreRepository(Bucket, connection_pool)
