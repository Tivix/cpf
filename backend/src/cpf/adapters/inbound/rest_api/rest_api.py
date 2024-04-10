from fastapi import APIRouter, FastAPI

from cpf.adapters.inbound.rest_api.ion import IonLink
from cpf.adapters.inbound.rest_api.models.responses.core import RootResponse
from cpf.core.ports.provided.services import ManageService, QueryService

router = APIRouter(prefix="/cpf/api")
app = FastAPI()

library_manage_service: ManageService | None = None
library_query_service: QueryService | None = None


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


@router.get(path="")
def get_api_root() -> RootResponse:
    return RootResponse(get_ladders=IonLink(href="/cpf/api/library/ladders/"))


@router.get(path="/health")
def health_check():
    return "Ok!"


from cpf.adapters.inbound.rest_api.library.api import router as library_router  # noqa

app.include_router(router=router)
app.include_router(router=library_router)
