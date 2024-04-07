from dataclasses import dataclass

from cpf.core.domain.aggregates.domain_event import DomainEvent


@dataclass(frozen=True)
class LadderCreated(DomainEvent):
    ladder_name: str


@dataclass(frozen=True)
class LadderBucketAdded(DomainEvent):
    bucket_slug: str
    band: int


@dataclass(frozen=True)
class BandSet(DomainEvent):
    threshold: int
    salary_range: str
    band_index: int
