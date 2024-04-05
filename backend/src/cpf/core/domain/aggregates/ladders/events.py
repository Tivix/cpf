from dataclasses import dataclass

from cpf.core.domain.aggregates.domain_event import DomainEvent


@dataclass(frozen=True)
class LadderCreated(DomainEvent):
    ladder_name: str


@dataclass(frozen=True)
class LadderBucketAdded(DomainEvent):
    bucket_uuid: str
    band: int
