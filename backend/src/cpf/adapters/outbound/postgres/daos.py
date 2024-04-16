import json
import os
from contextlib import contextmanager
from typing import Any, Generator

from psycopg2.extensions import connection as Connection
from psycopg2.extensions import cursor as Cursor
from psycopg2.pool import SimpleConnectionPool

from cpf.core.domain.aggregates.users.aggregate import User
from cpf.core.domain.enums import BucketType
from cpf.core.ports.required.daos import BucketReadModelDao as BaseBucketReadModelDao
from cpf.core.ports.required.daos import LadderReadModelDao as BaseLadderReadModelDao
from cpf.core.ports.required.daos import ScorecardDao
from cpf.core.ports.required.readmodels import (
    BucketReadModel,
    LadderReadModel,
    UserReadModel,
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
    def _execute_update(cursor: Cursor, bucket_slug: str, serialize_data: dict) -> Cursor:
        cursor.execute(
            "UPDATE buckets SET bucket_data=%s WHERE bucket_slug= %s,", (json.dumps(serialize_data), bucket_slug)
        )
        return cursor

    @staticmethod
    def _execute_create(cursor: Cursor, ladder_slug: str, serialize_data: dict) -> Cursor:
        cursor.execute("INSERT INTO buckets VALUES (%s, %s)", (ladder_slug, json.dumps(serialize_data)))
        return cursor

    def save(self, uuid: str, serialize_data: dict):
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM buckets WHERE bucket_slug = %s", (uuid,))
                results = cursor.fetchall()
                if not results:
                    cursor = self._execute_create(
                        cursor=cursor,
                        ladder_slug=uuid,
                        serialize_data=serialize_data,
                    )
                else:
                    cursor = self._execute_update(cursor=cursor, bucket_slug=uuid, serialize_data=serialize_data)
                conn.commit()

    def check_if_bucket_exists(self, bucket_slug: str) -> bool:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM buckets WHERE bucket_slug = %s", (bucket_slug,))
                results = cursor.fetchall()
                return len(results) > 0

    def get_bucket(self, slug: str) -> BucketReadModel:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM buckets WHERE bucket_slug = %s", (slug,))
                result = cursor.fetchone()
                bucket_slug, bucket_data, _ = result
                return BucketReadModel(
                    bucket_slug=bucket_slug,
                    bucket_name=bucket_data["bucket_name"],
                    description=bucket_data["description"],
                    bucket_type=BucketType(bucket_data["bucket_type"]),
                    advancement_levels=[
                        BucketReadModel.AdvancementLevel(
                            advancement_level=advancement_level_data.get("advancement_level"),
                            description=advancement_level_data.get("description"),
                            projects=[
                                BucketReadModel.AdvancementLevel.ExampleProject(
                                    title=project_data.get("title"), overview=project_data.get("overview")
                                )
                                for project_data in advancement_level_data.get("projects")
                            ],
                            atomic_skills=[
                                BucketReadModel.AdvancementLevel.AtomicSkill(
                                    uuid=atomic_skill_data.get("uuid"),
                                    name=atomic_skill_data.get("name"),
                                    category=atomic_skill_data.get("category"),
                                )
                                for atomic_skill_data in advancement_level_data.get("atomic_skills")
                            ],
                        )
                        for advancement_level_data in bucket_data.get("advancement_levels")
                    ],
                )

    def get_by_slugs(self, slug_list: list[str]) -> list[BucketReadModel]:
        buckets: list[BucketReadModel] = []
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM buckets WHERE bucket_slug IN %s", (tuple(slug_list),))
                results = cursor.fetchall()
                for result in results:
                    bucket_slug, bucket_data, _ = result
                    buckets.append(
                        BucketReadModel(
                            bucket_slug=bucket_slug,
                            bucket_name=bucket_data["bucket_name"],
                            description=bucket_data["description"],
                            bucket_type=BucketType(bucket_data["bucket_type"]),
                        )
                    )

        return buckets


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
    def _execute_update(cursor: Cursor, ladder_slug: str, serialize_data: dict) -> Cursor:
        cursor.execute(
            "UPDATE ladders SET ladder_data=%s WHERE ladder_slug= %s", (json.dumps(serialize_data), ladder_slug)
        )
        return cursor

    @staticmethod
    def _execute_create(cursor: Cursor, ladder_slug: str, serialize_data: dict) -> Cursor:
        cursor.execute("INSERT INTO ladders VALUES (%s, %s)", (ladder_slug, json.dumps(serialize_data)))
        return cursor

    def save(self, uuid: str, serialize_data: dict):
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM ladders WHERE ladder_slug = %s", (uuid,))
                results = cursor.fetchall()
                if not results:
                    cursor = self._execute_create(
                        cursor=cursor,
                        ladder_slug=uuid,
                        serialize_data=serialize_data,
                    )
                else:
                    cursor = self._execute_update(cursor=cursor, ladder_slug=uuid, serialize_data=serialize_data)
                conn.commit()

    def all(self) -> list[LadderReadModel]:
        ladders = []
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM ladders")
                results = cursor.fetchall()
                for result in results:
                    ladder_slug, ladder_data, _ = result
                    ladders.append(LadderReadModel(slug=ladder_slug, ladder_name=ladder_data["ladder_name"]))
        return ladders

    def get(self, slug: str) -> LadderReadModel | None:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM ladders WHERE ladder_slug = %s", (slug,))
                result = cursor.fetchone()
                if not result:
                    return None
                ladder_slug, ladder_data, _ = result

                return LadderReadModel(
                    slug=ladder_slug,
                    ladder_name=ladder_data["ladder_name"],
                    bands={
                        index: LadderReadModel.BandReadModel(
                            threshold=band.get("threshold"),
                            salary_range=band.get("salary_range"),
                            buckets=[bucket["bucket_slug"] for bucket in band.get("buckets")],
                        )
                        for index, band in ladder_data["bands"].items()
                    },
                )


class UserScorecardDao(ScorecardDao):

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
    def _execute_create(
        cursor: Cursor,
        username: str,
        first_name: str,
        last_name: str,
        email: str,
        manager_identifier: str,
    ) -> None:
        cursor.execute(
            "INSERT INTO users VALUES (%s, %s, %s, %s, %s)",
            (username, first_name, last_name, email, manager_identifier),
        )

    @staticmethod
    def _execute_update(cursor: Cursor, username: str, manager_identifier: str, activity: int) -> None:
        cursor.execute(
            "UPDATE users SET manager_identifier = %s, activity = %s WHERE username = %s",
            (manager_identifier, activity, username),
        )

    @staticmethod
    def _get_record_from_db(cursor: Cursor, username) -> tuple[Any] | None:
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        result = cursor.fetchone()
        if not result:
            return None
        return result

    def save(self, aggregate: User) -> None:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                if self._get_record_from_db(cursor, aggregate.aggregate_id):
                    self._execute_update(
                        cursor=cursor,
                        username=aggregate.aggregate_id,
                        manager_identifier="admin",
                        activity=0,
                    )
                else:
                    self._execute_create(
                        cursor=cursor,
                        username=aggregate.aggregate_id,
                        first_name=aggregate.first_name,
                        last_name=aggregate.last_name,
                        email=aggregate.email,
                        manager_identifier="admin",
                    )
                conn.commit()

    def all_users(self) -> list[UserReadModel]:
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM users")
                results = cursor.fetchall()
                read_models: list[UserReadModel] = []
                for result in results:
                    username, first_name, last_name, email, manager_identifier, activity = result
                    read_models.append(
                        UserReadModel(username=username, first_name=first_name, last_name=last_name, email=email)
                    )
                return read_models


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


def user_dao_factory() -> UserScorecardDao:
    return UserScorecardDao(connection_pool=connection_pool)
