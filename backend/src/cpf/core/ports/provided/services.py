from abc import ABC, abstractmethod

from cpf.core.ports.required.dtos import LadderDetailDTO, UserDTO
from cpf.core.ports.required.readmodels import BucketReadModel, LadderReadModel


class ManageService(ABC):

    @abstractmethod
    def check_if_data_is_exists(self) -> bool:
        pass

    @abstractmethod
    def create_ladder(self, ladder_data: str) -> str:
        pass

    @abstractmethod
    def add_new_bucket_to_ladder(self, ladder_slug: str, bucket_slug: str, band: int):
        pass

    @abstractmethod
    def create_bucket(self, bucket_data: dict) -> str:
        pass


class QueryService(ABC):

    @abstractmethod
    def get_all_ladders(self) -> list[LadderReadModel]:
        pass

    @abstractmethod
    def get_ladder(self, ladder_slug: str) -> LadderDetailDTO:
        pass

    @abstractmethod
    def get_bucket(self, bucket_slug: str) -> BucketReadModel:
        pass


class UserManagementService(ABC):

    @abstractmethod
    def get_user(self, access_token) -> UserDTO | None:
        pass

    @abstractmethod
    def create_new_user(self, first_name: str, last_name: str, email: str) -> UserDTO:
        pass
