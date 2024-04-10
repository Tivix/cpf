import os

from fastapi import APIRouter, Depends

from cpf.adapters.inbound.rest_api.ion import IonLink
from cpf.adapters.inbound.rest_api.library.models.responses import (
    AdvancementLevelResponse,
    AtomicSkillResponse,
    BandResponse,
    BucketDetailResponse,
    BucketListResponse,
    ExampleProjectResponse,
    LadderDetailResponse,
    LadderResponse,
)
from cpf.adapters.inbound.rest_api.rest_api import get_library_query_service
from cpf.core.ports.provided.services import QueryService
from cpf.core.ports.required.dtos import LadderDetailDTO
from cpf.core.ports.required.readmodels import BucketReadModel, LadderReadModel

router = APIRouter(prefix=f"{os.getenv('BASE_URL')}/library")


@router.get(path="/ladders", response_model_exclude_none=True)
def get_ladders(
    service: QueryService = Depends(get_library_query_service),
) -> list[LadderResponse]:
    ladder_read_models: list[LadderReadModel] = service.get_all_ladders()
    return [
        LadderResponse(
            ladder_slug=ladder.slug,
            ladder_name=ladder.ladder_name,
            ladder_detail=IonLink(href=f"/cpf/api/library/ladders/{ladder.slug}"),
        )
        for ladder in ladder_read_models
    ]


@router.get(path="/ladders/{ladder_slug}", response_model_exclude_none=True)
def get_ladder_details(
    ladder_slug: str, service: QueryService = Depends(get_library_query_service)
) -> LadderDetailResponse:
    ladder_detail: LadderDetailDTO = service.get_ladder(ladder_slug=ladder_slug)

    return LadderDetailResponse(
        ladder_name=ladder_detail.ladder_name,
        bands={
            index: BandResponse(
                threshold=band_read_model.threshold,
                salary_range=band_read_model.salary_range,
                hard_skill_buckets=[
                    BucketListResponse(
                        bucket_slug=bucket.bucket_slug,
                        bucket_name=bucket.bucket_name,
                        description=bucket.description,
                        bucket_detail=IonLink(href=f"/cpf/api/library/buckets/{bucket.bucket_slug}"),
                    )
                    for bucket in band_read_model.hard_skill_buckets
                ],
            )
            for index, band_read_model in ladder_detail.bands.items()
        },
    )


@router.get(path="/buckets/{bucket_slug}", response_model_exclude_none=True)
def get_bucket_details(
    bucket_slug: str, service: QueryService = Depends(get_library_query_service)
) -> BucketDetailResponse:
    bucket_details: BucketReadModel = service.get_bucket(bucket_slug=bucket_slug)
    advancement_levels: list[AdvancementLevelResponse] = []
    for advancement_level_data in bucket_details.advancement_levels:
        buckets_by_categories: dict[str, list[AtomicSkillResponse]] = {}
        for atomic_skill in advancement_level_data.atomic_skills:
            atomic_skill_response = AtomicSkillResponse(name=atomic_skill.name)
            if atomic_skill.category not in buckets_by_categories:
                buckets_by_categories[atomic_skill.category] = [
                    atomic_skill_response,
                ]
            else:
                buckets_by_categories[atomic_skill.category].append(atomic_skill_response)
        advancement_levels.append(
            AdvancementLevelResponse(
                advancement_level=advancement_level_data.advancement_level,
                description=advancement_level_data.description,
                categories=buckets_by_categories,
                projects=[
                    ExampleProjectResponse(title=project.title, overview=project.overview)
                    for project in advancement_level_data.projects
                ],
            )
        )

    return BucketDetailResponse(
        bucket_slug=bucket_details.bucket_slug,
        bucket_name=bucket_details.bucket_name,
        description=bucket_details.description,
        advancement_levels=advancement_levels,
    )
