from abc import ABC, abstractmethod


class ReadModelDao(ABC):

    @abstractmethod
    def save(self, uuid: str, serialize_data: dict):
        pass


class BucketReadModelDao(ReadModelDao, ABC):

    @abstractmethod
    def check_if_bucket_exists(self, bucket_uuid: str) -> bool:
        pass


class LadderReadModelDao(ReadModelDao, ABC):
    pass