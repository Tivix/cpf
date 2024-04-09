from fastapi import FastAPI, APIRouter, Depends

from cpf.adapters.inbound.rest_api.ion import IonLink
from cpf.adapters.inbound.rest_api.models.responses.core import RootResponse
from cpf.core.ports.provided.services import ManageService, QueryService


router = APIRouter(prefix="/cpf/api")
app = FastAPI()

ladder_manage_service: ManageService | None = None
ladder_query_service: QueryService | None = None


def set_ladder_manage_service(service: ManageService):
    global ladder_manage_service
    ladder_manage_service = service


def get_ladder_manage_service() -> ManageService:
    if not ladder_manage_service:
        raise RuntimeError("Manage Service not set")
    return ladder_manage_service


def set_ladder_query_service(service: QueryService):
    global ladder_query_service
    ladder_query_service = service


def get_ladder_query_service() -> QueryService:
    if not ladder_query_service:
        raise RuntimeError("Query service not set")
    return ladder_query_service


@router.get(path="")
def get_api_root() -> RootResponse:
    return RootResponse(
        get_ladders=IonLink(
            href="http:/localhost:8080/cpf/api/ladders"
        )
    )


@router.get(path="/health")
def health_check():
    return "Ok!"


@router.get(path="/ladders")
def get_ladders(
    service: QueryService = Depends(get_ladder_query_service)
):
    ladders = service.get_all_ladders()
    return [
        {
            "ladder_slug": ladder.uuid,
            "ladder_name": ladder.ladder_name
        } for ladder in ladders
    ]


@router.get(path="/ladders/{ladder_slug}")
def get_ladder_details(
    ladder_slug: str,
    service: QueryService = Depends(get_ladder_query_service)
):
    ladder_detail = service.get_ladder(ladder_slug=ladder_slug)
    return ladder_detail


@router.get(path="/buckets/{bucket_slug}")
def get_bucket_details(
    bucket_slug: str,
    service: QueryService = Depends(get_ladder_query_service)
):
    bucket_detail = service.get_bucket(bucket_slug=bucket_slug)
    return bucket_detail


app.include_router(router=router)
