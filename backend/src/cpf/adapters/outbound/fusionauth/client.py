import os

from fastapi import HTTPException
from fusionauth.fusionauth_client import FusionAuthClient
from starlette import status

from cpf.core.ports.required.clients import AuthenticationClient
from cpf.core.ports.required.readmodels import UserReadModel


class FusionAuthAuthenticationClient(AuthenticationClient):

    def __init__(self, client: FusionAuthClient):
        self._client = client

    @staticmethod
    def _get_user_read_model_from_response(response_data: dict) -> UserReadModel:
        user_data = response_data.get("user")
        return UserReadModel(
            username=user_data.get("username"),
            email=user_data.get("email"),
            first_name=user_data.get("data").get("first_name"),
            last_name=user_data.get("data").get("last_name"),
        )

    def get_user_data(self, access_token: str) -> UserReadModel | None:
        fusion_auth_response = self._client.retrieve_user_using_jwt(encoded_jwt=access_token)
        if fusion_auth_response.status != status.HTTP_200_OK:
            return None

        return self._get_user_read_model_from_response(fusion_auth_response.success_response)

    def create_user(self, email: str, username: str, first_name: str, last_name: str) -> UserReadModel:
        user_request = {
            "user": {
                "email": email,
                "username": username,
                "password": "dev-use-only",
                "data": {
                    "first_name": first_name,
                    "last_name": last_name,
                },
            }
        }
        client_response = self._client.create_user(request=user_request, user_id=None)
        if not client_response.was_successful():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

        return self._get_user_read_model_from_response(client_response.success_response)


fusion_auth_client = FusionAuthClient(api_key=os.getenv("FUSIONAUTH_API_KEY"), base_url=os.getenv("FUSIONAUTH_URL"))


def authentication_client_factory() -> AuthenticationClient:
    return FusionAuthAuthenticationClient(client=fusion_auth_client)
