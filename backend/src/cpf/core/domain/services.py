from typing import Iterable

from cpf.core.domain.aggregates.buckets.aggregate import Bucket
from cpf.core.domain.aggregates.ladders.aggregate import Ladder
from cpf.core.domain.aggregates.users.aggregate import User
from cpf.core.domain.enums import AdvancementLevel, BucketType
from cpf.core.domain.utils import get_username_from_email
from cpf.core.ports.provided.services import (
    ManageService,
    QueryService,
    UserManagementService,
)
from cpf.core.ports.required.clients import AuthenticationClient
from cpf.core.ports.required.daos import BucketReadModelDao, LadderReadModelDao
from cpf.core.ports.required.dtos import LadderDetailDTO, UserDTO
from cpf.core.ports.required.readmodels import BucketReadModel, LadderReadModel
from cpf.core.ports.required.writemodels import Repository


class LadderManageService(ManageService):

    def __init__(
        self,
        ladder_repository: Repository[Ladder],
        bucket_repository: Repository[Bucket],
        ladder_dao: LadderReadModelDao,
        bucket_dao: BucketReadModelDao,
    ):
        self._ladder_repository = ladder_repository
        self._bucket_repository = bucket_repository
        self._bucket_dao = bucket_dao
        self._ladder_dao = ladder_dao

    def check_if_data_is_exists(self) -> bool:
        ladders = self._ladder_dao.all()
        return len(ladders) > 0

    def create_ladder(self, ladder_data: dict) -> str:
        aggregate: Ladder = Ladder.create_ladder(
            ladder_slug=ladder_data.get("ladderSlug"),
            ladder_name=ladder_data.get("ladderName"),
        )
        for index, band_data in enumerate(ladder_data.get("bands"), start=1):
            aggregate.set_new_band(
                threshold=band_data.get("threshold"), salary_range=band_data.get("salary_range"), band_index=index
            )
            for bucket_data in band_data.get("buckets"):
                bucket_slug = bucket_data.get("bucket_slug")
                if self._bucket_dao.check_if_bucket_exists(bucket_slug=bucket_slug):
                    aggregate.add_new_bucket_to_band(bucket_slug=bucket_slug, band=index)
        self._ladder_repository.save(aggregate)
        self._ladder_dao.save(uuid=aggregate.aggregate_id, serialize_data=aggregate.serialize_to_dict())
        return aggregate.aggregate_id

    def add_new_bucket_to_ladder(self, ladder_slug: str, bucket_slug: str, band: int):
        aggregate: Ladder | None = self._ladder_repository.load(ladder_slug)
        if not aggregate:
            raise ValueError(f"Ladder with {ladder_slug} doesn't exists")

        # Check if bucket exists
        if not self._bucket_dao.check_if_bucket_exists(bucket_slug=bucket_slug):
            raise ValueError(f"Bucket with {bucket_slug} doesn't exists")

        aggregate.add_new_bucket_to_band(bucket_slug=bucket_slug, band=band)
        self._ladder_repository.save(aggregate)
        self._ladder_dao.save(uuid=ladder_slug, serialize_data=aggregate.serialize_to_dict())

    def create_bucket(self, bucket_data: dict) -> str:
        bucket_type: BucketType = BucketType(bucket_data.get("bucketType"))

        aggregate: Bucket = Bucket.create_bucket(
            bucket_slug=bucket_data.get("bucketSlug"),
            bucket_name=bucket_data.get("bucketName"),
            bucket_type=bucket_type,
        )
        aggregate.update_bucket_information(
            description=bucket_data.get("description"),
        )

        for advancement_level_data in bucket_data["advancement_levels"]:
            level = AdvancementLevel(advancement_level_data["advancement_level"])
            aggregate.update_advancement_level(
                advancement_level=level, description=advancement_level_data["description"]
            )
            for example_project_data in advancement_level_data["example_projects"]:
                aggregate.set_example_project(
                    project_uuid=None,
                    advancement_level=level,
                    title=example_project_data.get("title"),
                    overview=example_project_data.get("overview"),
                )

            for atomic_skill_data in advancement_level_data["atomic_skills"]:
                aggregate.set_atomic_skill(
                    skill_uuid=None,
                    advancement_level=level,
                    name=atomic_skill_data.get("name"),
                    category=atomic_skill_data.get("category"),
                )

        self._bucket_repository.save(aggregate)
        self._bucket_dao.save(uuid=aggregate.aggregate_id, serialize_data=aggregate.serialize_to_dict())
        return aggregate.aggregate_id


class LibraryQueryService(QueryService):
    def __init__(self, ladder_dao: LadderReadModelDao, bucket_dao: BucketReadModelDao) -> None:
        self._ladder_dao = ladder_dao
        self._bucket_dao = bucket_dao

    def get_all_ladders(self) -> list[LadderReadModel]:
        return self._ladder_dao.all()

    def get_ladder(self, ladder_slug: str) -> LadderDetailDTO:
        ladder: LadderReadModel = self._ladder_dao.get(ladder_slug)

        bands: dict[int, LadderDetailDTO.BandDTO] = {}
        for index, band in ladder.bands.items():
            band_buckets = self._bucket_dao.get_by_slugs(slug_list=band.buckets)
            hard_skill_buckets: Iterable[BucketReadModel] = filter(
                lambda bucket: bucket.bucket_type == BucketType.HARD_SKILL, band_buckets
            )
            soft_skill_buckets: Iterable[BucketReadModel] = filter(
                lambda bucket: bucket.bucket_type == BucketType.SOFT_SKILL, band_buckets
            )

            band_dto = LadderDetailDTO.BandDTO(
                threshold=band.threshold,
                salary_range=band.salary_range,
                hard_skill_buckets=[
                    LadderDetailDTO.BucketDTO(
                        bucket_slug=bucket.bucket_slug,
                        bucket_name=bucket.bucket_name,
                        description=bucket.description,
                    )
                    for bucket in hard_skill_buckets
                ],
                soft_skill_buckets=[
                    LadderDetailDTO.BucketDTO(
                        bucket_slug=bucket.bucket_slug,
                        bucket_name=bucket.bucket_name,
                        description=bucket.description,
                    )
                    for bucket in soft_skill_buckets
                ],
            )
            bands[index] = band_dto

        return LadderDetailDTO(ladder_name=ladder.ladder_name, bands=bands)

    def get_bucket(self, bucket_slug: str) -> BucketReadModel:
        return self._bucket_dao.get_bucket(slug=bucket_slug)


class FusionAuthUserManagementService(UserManagementService):

    def __init__(
        self,
        client: AuthenticationClient,
        repository: Repository[User],
    ) -> None:
        self._repository = repository
        self._client = client

    def get_user(self, access_token: str | None) -> UserDTO | None:
        # Check if access token exists
        if not access_token:
            return None
        # Check if user exists in authentication service
        user_data = self._client.get_user_data(access_token=access_token)
        if not user_data:
            return None

        # Check if user exists in CPF database
        # TODO Rebuild to check UserQueryService to see if read model exists
        aggregate = self._repository.load(user_data.username)
        if not aggregate:
            return None

        user_dto = UserDTO(
            username=user_data.username,
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
        )
        return user_dto

    def create_new_user(self, first_name: str, last_name: str, email: str) -> UserDTO:
        username = get_username_from_email(email)
        user_data = self._client.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username,
        )
        aggregate = User.create_user(user_data.username)
        aggregate.set_personal_information(email=email, first_name=first_name, last_name=last_name)
        self._repository.save(aggregate)
        # TODO Save readmodel to dao
        return UserDTO(username=username, email=email, first_name=first_name, last_name=last_name)
