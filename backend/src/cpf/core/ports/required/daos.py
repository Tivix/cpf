from abc import ABC, abstractmethod

from cpf.core.ports.required.readmodels import LadderReadModel, BucketReadModel


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
    def get(self, uuid) -> LadderReadModel:
        pass
