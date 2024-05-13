from abc import ABC, abstractmethod
from functools import wraps

from fastapi import HTTPException
from starlette import status

from cpf.core.ports.required.dtos import UserDTO


class Permission(ABC):

    @classmethod
    @abstractmethod
    def validate_permission(cls, user: UserDTO) -> bool:
        pass


def check_permissions(permission_classes: list[type[Permission]]):
    def inner(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            user: UserDTO = kwargs.get("user")
            if not user:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User not authenticated")
            if not all(permission.validate_permission(user=user) for permission in permission_classes):
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User has no permission")
            return func(*args, **kwargs)

        return wrapper

    return inner
