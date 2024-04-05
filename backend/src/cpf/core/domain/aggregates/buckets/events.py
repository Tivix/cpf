from dataclasses import dataclass, field

from cpf.core.domain.aggregates.domain_event import DomainEvent


@dataclass(frozen=True)
class BucketCreated(DomainEvent):
    bucket_name: str
    bucket_type: str


@dataclass(frozen=True)
class AtomicSkillSet(DomainEvent):
    name: str
    category: str = field(default="Core")
    advancement_level: int | None = None

