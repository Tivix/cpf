from abc import ABC, abstractmethod

from cpf.core.ports.required.readmodels import UserReadModel


class AuthenticationClient(ABC):

    @abstractmethod
    def get_user_data(self, access_token: str) -> UserReadModel | None:
        pass

    @abstractmethod
    def create_user(self, email: str, username: str, first_name: str, last_name: str) -> UserReadModel:
        pass
