import os
from typing import Annotated

from fastapi import APIRouter, Depends

from cpf.adapters.inbound.rest_api.permissions import check_permissions
from cpf.core.ports.provided.services import UserManagementService
from cpf.core.ports.required.dtos import UserDTO

from ..rest_api import auth, get_user_management_service
from .models.requests import PutUser
from .models.responses import UserResponse

router = APIRouter(prefix=f"{os.getenv('BASE_URL')}/users")


@router.post(path="", response_model_exclude_none=True)
@check_permissions(permission_classes=[])
def create_new_user(
    request: PutUser,
    user: Annotated[UserDTO, Depends(auth)],
    service: UserManagementService = Depends(get_user_management_service),
) -> UserResponse:
    new_user: UserDTO = service.create_new_user(
        first_name=request.first_name, last_name=request.last_name, email=request.email
    )
    return UserResponse(
        username=new_user.username,
        email=new_user.email,
        first_name=new_user.first_name,
        last_name=new_user.last_name,
    )
