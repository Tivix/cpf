import json
import os
from contextlib import contextmanager
from typing import Generator

from psycopg2.pool import SimpleConnectionPool
from psycopg2.extensions import connection as Connection
from psycopg2.extensions import cursor as Cursor


from cpf.core.ports.required.daos import (
    BucketReadModelDao as BaseBucketReadModelDao,
    LadderReadModelDao as BaseLadderReadModelDao
)


class BucketReadModelDao(BaseBucketReadModelDao):

    def __init__(self, connection_pool: SimpleConnectionPool):
        self._pool = connection_pool

    @contextmanager
    def _get_connection(self) -> Generator[Connection, None, None]:
        conn = self._pool.getconn()
        try:
            yield conn
        finally:
            self._pool.putconn(conn)

    @staticmethod
    def _execute_update(cursor: Cursor, ladder_uuid: str, serialize_data: dict) -> Cursor:
        cursor.execute(
            "UPDATE buckets SET bucket_data=%s WHERE bucket_uuid= %s,",
            (json.dumps(serialize_data), ladder_uuid)
        )
        return cursor

    @staticmethod
    def _execute_create(cursor: Cursor, ladder_uuid: str, serialize_data: dict) -> Cursor:
        cursor.execute(
            "INSERT INTO buckets VALUES (%s, %s)",
            (ladder_uuid, json.dumps(serialize_data))
        )
        return cursor

    def save(self, uuid: str, serialize_data: dict):
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM buckets WHERE bucket_uuid = %s",
                    (uuid,)
                )
                results = cursor.fetchall()
                if not results:
                    cursor = self._execute_create(
                        cursor=cursor,
                        ladder_uuid=uuid,
                        serialize_data=serialize_data,
                    )
                else:
                    cursor = self._execute_update(
                        cursor=cursor,
                        ladder_uuid=uuid,
                        serialize_data=serialize_data
                    )
                conn.commit()

    def check_if_bucket_exists(self, bucket_uuid: str) -> bool:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM buckets WHERE bucket_uuid = %s",
                    (bucket_uuid, )
                )
                results = cursor.fetchall()
                return len(results) > 0


class LadderReadModelDao(BaseLadderReadModelDao):

    def __init__(self, connection_pool: SimpleConnectionPool):
        self._pool = connection_pool

    @contextmanager
    def _get_connection(self) -> Generator[Connection, None, None]:
        conn = self._pool.getconn()
        try:
            yield conn
        finally:
            self._pool.putconn(conn)

    @staticmethod
    def _execute_update(cursor: Cursor, ladder_uuid: str, serialize_data: dict) -> Cursor:
        cursor.execute(
            "UPDATE ladders SET ladder_data=%s WHERE ladder_uuid= %s",
            (json.dumps(serialize_data), ladder_uuid)
        )
        return cursor

    @staticmethod
    def _execute_create(cursor: Cursor, ladder_uuid: str, serialize_data: dict) -> Cursor:
        cursor.execute(
            "INSERT INTO ladders VALUES (%s, %s)",
            (ladder_uuid, json.dumps(serialize_data))
        )
        return cursor

    def save(self, uuid: str, serialize_data: dict):
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM ladders WHERE ladder_uuid = %s",
                    (uuid,)
                )
                results = cursor.fetchall()
                if not results:
                    cursor = self._execute_create(
                        cursor=cursor,
                        ladder_uuid=uuid,
                        serialize_data=serialize_data,
                    )
                else:
                    cursor = self._execute_update(
                        cursor=cursor,
                        ladder_uuid=uuid,
                        serialize_data=serialize_data
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


def ladder_dao_factory() -> BaseLadderReadModelDao:
    return LadderReadModelDao(connection_pool=connection_pool)


def bucket_dao_factory() -> BaseBucketReadModelDao:
    return BucketReadModelDao(connection_pool=connection_pool)
