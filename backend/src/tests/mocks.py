from cpf.core.domain.enums import BucketType
from cpf.core.ports.provided.services import QueryService, UserManagementService
from cpf.core.ports.required.dtos import LadderDetailDTO, UserDTO
from cpf.core.ports.required.readmodels import (
    BucketReadModel,
    LadderReadModel,
    UserReadModel,
)


class MockUserManagementService(UserManagementService):

    def get_user(self, access_token) -> UserDTO | None:
        return UserDTO(first_name="John", last_name="Doe", email="john.doe@kellton.com", username="john.doe")

    def create_new_user(self, first_name: str, last_name: str, email: str) -> UserDTO:
        return UserDTO(first_name="John", last_name="Doe", email="john.doe@kellton.com", username="john.doe")

    def get_users(self, manager_identifier: str | None = None) -> list[UserReadModel]:
        return [
            UserReadModel(first_name="John", last_name="Doe", email="john.doe@kellton.com", username="john.doe"),
        ]


class MockQueryService(QueryService):
    def get_all_ladders(self) -> list[LadderReadModel]:
        return [
            LadderReadModel(slug="backend", ladder_name="Backend"),
            LadderReadModel(slug="frontend", ladder_name="Frontend"),
        ]

    def get_ladder(self, ladder_slug: str) -> LadderDetailDTO:
        return LadderDetailDTO(
            ladder_name="Backend",
            bands={
                1: LadderDetailDTO.BandDTO(
                    threshold=2,
                    salary_range="100-1000",
                    hard_skill_buckets=[
                        LadderDetailDTO.BucketDTO(
                            bucket_slug="frameworks", bucket_name="Frameworks", description="Lorem ipsum"
                        )
                    ],
                    soft_skill_buckets=[],
                )
            },
        )

    def get_bucket(self, bucket_slug: str) -> BucketReadModel:
        return BucketReadModel(
            bucket_slug="frameworks",
            bucket_name="Frameworks",
            description="Lorem ipsum",
            bucket_type=BucketType.HARD_SKILL,
            advancement_levels=[
                BucketReadModel.AdvancementLevel(
                    advancement_level=1,
                    description="Lorem ipsum",
                    projects=[],
                    atomic_skills=[
                        BucketReadModel.AdvancementLevel.AtomicSkill(
                            uuid="4a906aa9-29ff-4f5e-ae27-1145ce22d6fa", name="Atomic skill 1", category="Common"
                        )
                    ],
                ),
                BucketReadModel.AdvancementLevel(
                    advancement_level=2, description="Lorem ipsum", projects=[], atomic_skills=[]
                ),
                BucketReadModel.AdvancementLevel(
                    advancement_level=3, description="Lorem ipsum", projects=[], atomic_skills=[]
                ),
            ],
        )
