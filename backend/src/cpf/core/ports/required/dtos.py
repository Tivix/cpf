from dataclasses import dataclass

from cpf.core.domain.aggregates.users.aggregate import User
from cpf.core.domain.enums import AdvancementLevel


@dataclass(frozen=True)
class UserDTO:
    username: str
    email: str
    first_name: str
    last_name: str


@dataclass(frozen=True)
class UserScorecardDTO:

    @dataclass(frozen=True)
    class Ladder:
        slug: str
        main_ladder: bool

    @dataclass(frozen=True)
    class HardSkillBucket:
        slug: str
        archived_level: AdvancementLevel
        completed_atomic_skills: set[str]

    @dataclass(frozen=True)
    class SoftSkillBucket:
        slug: str
        completed: bool
        completed_atomic_skills: set[str]

    first_name: str
    last_name: str
    ladders: dict[str, Ladder]
    hard_skill_buckets: dict[str, HardSkillBucket]
    soft_skill_buckets: dict[str, SoftSkillBucket]

    @classmethod
    def from_aggregate(cls, aggregate: User) -> "UserScorecardDTO":
        return cls(
            first_name=aggregate.first_name,
            last_name=aggregate.last_name,
            ladders={
                ladder_slug: UserScorecardDTO.Ladder(slug=ladder_slug, main_ladder=ladder.main_ladder)
                for ladder_slug, ladder in aggregate.user_ladders.items()
            },
            hard_skill_buckets={
                bucket_slug: UserScorecardDTO.HardSkillBucket(
                    slug=bucket_slug,
                    archived_level=bucket.archived_level,
                    completed_atomic_skills=bucket.completed_atomic_skills,
                )
                for bucket_slug, bucket in aggregate.hard_skill_buckets.items()
            },
            soft_skill_buckets={
                bucket_slug: UserScorecardDTO.SoftSkillBucket(
                    slug=bucket_slug, completed=bucket.completed, completed_atomic_skills=bucket.completed_atomic_skills
                )
                for bucket_slug, bucket in aggregate.soft_skill_buckets.items()
            },
        )


@dataclass(frozen=True)
class LadderDetailDTO:

    @dataclass(frozen=True)
    class BucketDTO:
        bucket_slug: str
        bucket_name: str
        description: str

    @dataclass(frozen=True)
    class BandDTO:
        threshold: int
        salary_range: str
        hard_skill_buckets: list["LadderDetailDTO.BucketDTO"]
        soft_skill_buckets: list["LadderDetailDTO.BucketDTO"]

    ladder_name: str
    bands: dict[int, BandDTO]
