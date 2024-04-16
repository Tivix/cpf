from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Generic, TypeVar

from cpf.core.domain.aggregates.aggregate_root import AggregateRoot
from cpf.core.ports.required.readmodels import (
    BucketReadModel,
    LadderReadModel,
    UserReadModel,
)

AR = TypeVar("AR", bound=AggregateRoot)
ReadModel = TypeVar("ReadModel", bound=dataclass)


class ReadModelDao(ABC):

    @abstractmethod
    def save(self, uuid: str, serialize_data: dict):
        pass


class BucketReadModelDao(ReadModelDao, ABC):

    @abstractmethod
    def check_if_bucket_exists(self, bucket_slug: str) -> bool:
        pass

    @abstractmethod
    def get_bucket(self, slug: str) -> BucketReadModel:
        pass

    @abstractmethod
    def get_by_slugs(self, slug_list: list[str]) -> list[BucketReadModel]:
        pass


class LadderReadModelDao(ReadModelDao, ABC):

    @abstractmethod
    def all(self) -> list[LadderReadModel]:
        pass

    @abstractmethod
    def get(self, slug: str) -> LadderReadModel | None:
        pass


class SaveReadModelDao(ABC, Generic[AR, ReadModel]):

    @abstractmethod
    def save(self, aggregate: AR) -> None:
        pass

    @abstractmethod
    def load(self, aggregate_id: str) -> ReadModel | None:
        pass


class ScorecardDao(ABC):

    @abstractmethod
    def all_users(self) -> list[UserReadModel]:
        pass
