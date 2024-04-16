import os
from typing import Annotated

from fastapi import APIRouter, Depends

from cpf.adapters.inbound.rest_api.permissions import check_permissions
from cpf.core.ports.provided.services import (
    ScorecardManageService,
    UserManagementService,
)
from cpf.core.ports.required.dtos import UserDTO
from cpf.core.ports.required.readmodels import UserReadModel

from ..rest_api import auth, get_scorecard_manage_service, get_user_management_service
from .models.requests import PutUser, UserProgress
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


@router.get(path="", response_model_exclude_none=True)
@check_permissions(permission_classes=[])
def get_users(
    user: Annotated[UserDTO, Depends(auth)], service: UserManagementService = Depends(get_user_management_service)
) -> list[UserResponse]:
    users: list[UserReadModel] = service.get_users(manager_identifier=user.username)
    return [
        UserResponse(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            username=user.username,
        )
        for user in users
    ]


@router.get(path="/{username}", response_model_exclude_none=True)
def get_user_scorecard(username: str, service: ScorecardManageService = Depends(get_scorecard_manage_service)):
    user_scorecard = service.get_user_scorecard(username=username)
    return user_scorecard


@router.put(path="/{username}/ladder/{ladder_slug}", response_model_exclude_none=True)
def set_user_ladder(
    username: str, ladder_slug: str, service: ScorecardManageService = Depends(get_scorecard_manage_service)
):
    user_scorecard = service.set_ladder(username=username, ladder_slug=ladder_slug)
    return user_scorecard


@router.put(path="/{username}/progress", response_model_exclude_none=True)
def update_user_progress(
    username: str, request: UserProgress, service: ScorecardManageService = Depends(get_scorecard_manage_service)
):
    user_scorecard = service.update_user_progress(
        username=username,
        bucket_slug=request.bucket_slug,
        atomic_skills=request.atomic_skills,
    )
    return user_scorecard
