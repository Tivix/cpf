from dataclasses import dataclass, field
from typing import NewType

from cpf.core.domain.aggregates.aggregate_root import AggregateRoot
from cpf.core.domain.aggregates.domain_event import DomainEvent
from cpf.core.domain.aggregates.users.events import (
    ProgressSet,
    UserCreated,
    UserLadderSet,
    UserPersonalInformationSet,
)
from cpf.core.domain.enums import AdvancementLevel, BucketType
from cpf.core.ports.required.readmodels import BucketReadModel

Band = NewType("Band", str)
AtomicSkill = NewType("AtomicSkill", str)


class User(AggregateRoot):

    def __init__(self, id: str):
        super().__init__(id)
        self.email: str | None = None
        self.first_name: str | None = None
        self.last_name: str | None = None
        self.user_ladders: dict[str, UserLadder] = {}
        self.hard_skill_buckets: dict[str, HardSkillBucket] = {}
        self.soft_skill_buckets: dict[str, SoftSkillBucket] = {}

    def has_main_ladder(self) -> bool:
        return any(ladder.main_ladder for ladder in self.user_ladders.values())

    def check_level_of_hard_skill_bucket(
        self, bucket_reference: BucketReadModel, new_skills: list[str] | None = None
    ) -> AdvancementLevel:
        if not new_skills:
            new_skills = []
        user_bucket_skills = self.hard_skill_buckets[bucket_reference.bucket_slug].completed_atomic_skills
        for advancement_level in AdvancementLevel.get_hard_skills_levels():
            level_to_check: BucketReadModel.AdvancementLevel = next(
                level
                for level in bucket_reference.advancement_levels
                if level.advancement_level == advancement_level.value
            )
            advancement_level_skills_to_pass = [skill.uuid for skill in level_to_check.atomic_skills]
            for skill_to_pass in advancement_level_skills_to_pass:
                if not (skill_to_pass in user_bucket_skills or skill_to_pass in new_skills):
                    return AdvancementLevel(level_to_check.advancement_level - 1)
        return AdvancementLevel.LEVEL_3

    def check_if_soft_skill_bucket_completed(
        self, bucket_reference: BucketReadModel, new_skills: list[str] | None = None
    ) -> bool:
        if not new_skills:
            new_skills = []
        atomic_skills_to_pass = [skill.uuid for skill in bucket_reference.advancement_levels[0].atomic_skills]
        user_bucket_skills = self.soft_skill_buckets[bucket_reference.bucket_slug].completed_atomic_skills
        for skill_to_pass in atomic_skills_to_pass:
            if not (skill_to_pass in user_bucket_skills or skill_to_pass in new_skills):
                return False
        return True

    # Producers

    @classmethod
    def create_user(cls, user_id: str) -> "User":
        instance = cls(id=user_id)
        instance.produce_event(UserCreated())
        return instance

    @AggregateRoot.produces_events
    def set_personal_information(self, email: str, first_name: str, last_name: str) -> UserPersonalInformationSet:
        return UserPersonalInformationSet(
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

    @AggregateRoot.produces_events
    def assign_new_ladder(
        self,
        ladder_slug: str,
        main_ladder: bool,
        hard_skill_buckets_slugs: list[str],
        soft_skill_buckets_slugs: list[str],
    ) -> UserLadderSet:
        if ladder_slug in self.user_ladders:
            raise ValueError("Ladder already assign")

        return UserLadderSet(
            ladder_slug=ladder_slug,
            main_ladder=main_ladder,
            hard_skills_buckets_slugs=hard_skill_buckets_slugs,
            soft_skills_buckets_slugs=soft_skill_buckets_slugs,
        )

    @AggregateRoot.produces_events
    def update_progress(
        self, bucket_type: BucketType, bucket_slug: str, atomic_skills: list[str], new_level_archived: int
    ) -> ProgressSet:
        if bucket_type == BucketType.HARD_SKILL and bucket_slug not in self.hard_skill_buckets:
            raise ValueError(f"User has no bucket {bucket_slug}")

        if bucket_type == BucketType.SOFT_SKILL and bucket_slug not in self.soft_skill_buckets:
            raise ValueError(f"User has no bucket {bucket_slug}")

        return ProgressSet(
            bucket_slug=bucket_slug,
            bucket_type=bucket_type.value,
            atomic_skills=atomic_skills,
            new_level=new_level_archived,
        )

    # Handlers

    @AggregateRoot.handles_events(UserCreated)
    def _handle_user_created(self, event: UserCreated) -> None:
        print(f"User created {self.aggregate_id}")

    @AggregateRoot.handles_events(UserPersonalInformationSet)
    def _handle_personal_information_set(self, event: UserPersonalInformationSet) -> None:
        self.email = event.email
        self.first_name = event.first_name
        self.last_name = event.last_name

    @AggregateRoot.handles_events(UserLadderSet)
    def _handle_user_ladder_set(self, event: UserLadderSet) -> None:
        # Add new ladder to user ladders
        self.user_ladders[event.ladder_slug] = UserLadder(
            ladder_slug=event.ladder_slug,
            main_ladder=event.main_ladder,
        )
        # Add all missing buckets to user list
        for bucket_slug in event.hard_skills_buckets_slugs:
            if bucket_slug not in self.hard_skill_buckets:
                self.hard_skill_buckets[bucket_slug] = HardSkillBucket(bucket_slug=bucket_slug)

        for bucket_slug in event.soft_skills_buckets_slugs:
            if bucket_slug not in self.soft_skill_buckets:
                self.soft_skill_buckets[bucket_slug] = SoftSkillBucket(bucket_slug=bucket_slug)

    @AggregateRoot.handles_events(ProgressSet)
    def _handle_progress_set(self, event: ProgressSet) -> None:
        bucket_type = BucketType(event.bucket_type)
        if bucket_type == BucketType.HARD_SKILL:
            self.hard_skill_buckets[event.bucket_slug].register_progress(
                atomic_skills=event.atomic_skills, new_level_archived=bool(event.new_level)
            )

    def handle_event(self, event: DomainEvent) -> None:
        raise NotImplementedError("Event not handled")


@dataclass
class HardSkillBucket:
    bucket_slug: str
    archived_level: AdvancementLevel = field(default=AdvancementLevel.NO_LEVEL)
    completed_atomic_skills: set[str] = field(default_factory=set)

    def register_progress(self, atomic_skills: list[str], new_level_archived: int) -> None:
        # TODO Think where we should validate, if param should be set
        self.completed_atomic_skills.update(atomic_skills)  # noqa
        if new_level_archived and not self.archived_level == AdvancementLevel.LEVEL_3:
            self.archived_level = AdvancementLevel(new_level_archived)


@dataclass
class SoftSkillBucket:
    bucket_slug: str
    completed: bool = field(default=False)
    completed_atomic_skills: set[str] = field(default_factory=set)

    def register_progress(self, atomic_skills: list[str], new_level_archived: bool) -> None:
        # TODO Think where we should validate, if param should be set
        self.completed_atomic_skills.update(atomic_skills)  # noqa
        if new_level_archived:
            self.completed = True


@dataclass
class UserLadder:
    ladder_slug: str
    main_ladder: bool
