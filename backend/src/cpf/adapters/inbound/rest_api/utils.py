from typing import Callable, TypedDict

from fastapi import FastAPI
from starlette.routing import Route

from cpf.core.ports.required.dtos import UserDTO


def env_to_bool(value: str) -> bool:
    return value.lower() in ("true", "1")


def fake_user_factory() -> UserDTO:
    return UserDTO(identifier="fake_user@mock.com", first_name="Mock", last_name="John")


class EndpointInfo(TypedDict):
    method: str | None
    href: str


def get_endpoint_info(app: FastAPI, endpoint_function: Callable, origin: str) -> EndpointInfo | None:
    for route in app.routes:
        if isinstance(route, Route) and route.endpoint is endpoint_function:
            methods = list(route.methods.intersection(["GET", "POST", "PUT", "DELETE", "PATCH"]))
            path = route.path

            return EndpointInfo(method=methods[0] if methods else None, href=origin + path)
    return None
