from dataclasses import dataclass

from cpf.core.domain.aggregates.domain_event import DomainEvent


class UserCreated(DomainEvent):
    pass


@dataclass(frozen=True)
class UserPersonalInformationSet(DomainEvent):
    email: str
    first_name: str
    last_name: str


@dataclass(frozen=True)
class UserLadderSet(DomainEvent):
    ladder_slug: str
    main_ladder: bool
    hard_skills_buckets_slugs: list[str]
    soft_skills_buckets_slugs: list[str]


@dataclass(frozen=True)
class ProgressSet(DomainEvent):
    bucket_type: str
    bucket_slug: str
    atomic_skills: list[str]
    new_level: int
