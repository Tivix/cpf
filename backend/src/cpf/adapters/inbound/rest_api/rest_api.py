import os
from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI
from pydantic import HttpUrl
from starlette.requests import Request

from cpf.adapters.inbound.rest_api.ion import IonLink
from cpf.adapters.inbound.rest_api.models.responses.core import (
    AuthenticatedRootResponse,
    UnauthenticatedRootResponse,
    UserResponse,
)
from cpf.adapters.inbound.rest_api.permissions import check_permissions
from cpf.adapters.inbound.rest_api.utils import env_to_bool, fake_user_factory
from cpf.core.ports.provided.services import (
    ManageService,
    QueryService,
    UserManagementService,
)
from cpf.core.ports.required.dtos import UserDTO

router = APIRouter(prefix="/cpf/api")
app = FastAPI()

library_manage_service: ManageService | None = None
library_query_service: QueryService | None = None
user_management_service: UserManagementService | None = None


def set_library_manage_service(service: ManageService):
    global library_manage_service
    library_manage_service = service


def get_library_manage_service() -> ManageService:
    if not library_manage_service:
        raise RuntimeError("Manage Service not set")
    return library_manage_service


def set_library_query_service(service: QueryService):
    global library_query_service
    library_query_service = service


def get_library_query_service() -> QueryService:
    if not library_query_service:
        raise RuntimeError("Query service not set")
    return library_query_service


def set_user_management_service(service: UserManagementService) -> None:
    global user_management_service
    user_management_service = service


def get_user_management_service() -> UserManagementService:
    if not user_management_service:
        raise RuntimeError("User management service not set")
    return user_management_service


class FastAPIAuth:

    def __call__(self, request: Request) -> UserDTO:
        # TODO Remove after auth will be implemented on frontend
        if env_to_bool(os.getenv("USE_MOCK_USER")):
            return fake_user_factory()
        service_instance: UserManagementService = get_user_management_service()
        return service_instance.get_user(access_token=request.cookies.get("access_token"))


auth = FastAPIAuth()


@router.get(path="", response_model_exclude_none=True)
def get_api_root(
    user: Annotated[UserDTO | None, Depends(auth)]
) -> AuthenticatedRootResponse | UnauthenticatedRootResponse:
    if not user:
        return UnauthenticatedRootResponse(
            # TODO Create social auth login redirect
            login=IonLink(href="http://localhost:8080/api/login")
        )

    return AuthenticatedRootResponse(
        user=UserResponse(
            first_name=user.first_name,
            last_name=user.last_name,
        ),
        get_ladders=IonLink(
            href="http:/localhost:8080/cpf/api/ladders"
        )
    )


@router.get(path="/health")
def health_check():
    return "Ok!"


from cpf.adapters.inbound.rest_api.library.api import router as library_router  # noqa

from cpf.adapters.inbound.rest_api.users.api import router as users_router  # noqa

app.include_router(router=router)
app.include_router(router=library_router)
app.include_router(router=users_router)
