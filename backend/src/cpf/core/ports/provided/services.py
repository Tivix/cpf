from abc import ABC, abstractmethod

from cpf.core.ports.required.dtos import LadderDetailDTO, UserDTO, UserScorecardDTO
from cpf.core.ports.required.readmodels import (
    BucketReadModel,
    LadderReadModel,
    UserReadModel,
)


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

    @abstractmethod
    def get_users(self, manager_identifier: str | None = None) -> list[UserReadModel]:
        pass


class ScorecardManageService(ABC):

    @abstractmethod
    def get_user_scorecard(self, username: str) -> UserScorecardDTO:
        pass

    @abstractmethod
    def set_ladder(self, username: str, ladder_slug: str) -> UserScorecardDTO:
        pass

    @abstractmethod
    def update_user_progress(
        self,
        username: str,
        bucket_slug: str,
        atomic_skills: list[str],
    ) -> UserScorecardDTO:
        pass
