from dataclasses import dataclass, field

from cpf.core.domain.aggregates.domain_event import DomainEvent


@dataclass(frozen=True)
class BucketCreated(DomainEvent):
    bucket_name: str
    bucket_type: str


@dataclass(frozen=True)
class BucketUpdated(DomainEvent):
    description: str


@dataclass(frozen=True)
class AdvancementLevelEvent:
    advancement_level: int


@dataclass(frozen=True)
class AtomicSkillSet(DomainEvent, AdvancementLevelEvent):
    uuid: str
    name: str
    category: str = field(default="Core")


@dataclass(frozen=True)
class AdvancementLevelUpdate(DomainEvent, AdvancementLevelEvent):
    description: str


@dataclass(frozen=True)
class ExampleProjectSet(DomainEvent, AdvancementLevelEvent):
    uuid: str
    title: str
    overview: str
