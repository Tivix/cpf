from abc import ABC, abstractmethod


class ManageService(ABC):

    @abstractmethod
    def create_new_ladder(self, ladder_name: str, initial_data: dict | None = None) -> str:
        pass

    @abstractmethod
    def add_new_bucket_to_ladder(self, ladder_uuid: str, bucket_uuid: str, band: int):
        pass

    @abstractmethod
    def create_bucket(self, bucket_name: str) -> str:
        pass
