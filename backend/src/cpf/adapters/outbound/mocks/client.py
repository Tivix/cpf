from cpf.core.ports.required.clients import AuthenticationClient
from cpf.core.ports.required.readmodels import UserReadModel


class MockAuthenticationClient(AuthenticationClient):
    def get_user_data(self, access_token: str) -> UserReadModel | None:
        return UserReadModel(
            username="testUser",
            email="test@kellton.com",
            first_name="John",
            last_name="Doe"
        )

    def create_user(self, email: str, username: str, first_name: str, last_name: str) -> UserReadModel:
        return UserReadModel(
            username="testUser",
            email="test@kellton.com",
            first_name="John",
            last_name="Doe"
        )


def mock_authenticate_client_factory() -> AuthenticationClient:
    return MockAuthenticationClient()