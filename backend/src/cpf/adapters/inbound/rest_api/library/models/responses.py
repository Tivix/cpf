from cpf.adapters.inbound.rest_api.ion import IonBaseModel, IonLink


class LadderResponse(IonBaseModel):
    ladder_slug: str
    ladder_name: str
    ladder_detail: IonLink


class BucketListResponse(IonBaseModel):
    bucket_slug: str
    bucket_name: str
    description: str
    bucket_detail: IonLink


class BandResponse(IonBaseModel):
    threshold: int
    salary_range: str
    hard_skill_buckets: list[BucketListResponse] = []
    soft_skill_buckets: list[BucketListResponse] = []


class LadderDetailResponse(IonBaseModel):
    ladder_name: str
    bands: dict[int, BandResponse]


class ExampleProjectResponse(IonBaseModel):
    title: str
    overview: str


class AtomicSkillResponse(IonBaseModel):
    name: str


class AdvancementLevelResponse(IonBaseModel):
    advancement_level: int
    description: str
    projects: list[ExampleProjectResponse] = []
    categories: dict[str, list[AtomicSkillResponse]] = {}


class BucketDetailResponse(IonBaseModel):
    bucket_slug: str
    bucket_name: str
    description: str

    advancement_levels: list[AdvancementLevelResponse]
