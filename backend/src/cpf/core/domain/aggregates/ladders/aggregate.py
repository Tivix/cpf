import uuid
from dataclasses import dataclass

from cpf.core.domain.aggregates.aggregate_root import AggregateRoot
from cpf.core.domain.aggregates.domain_event import DomainEvent
from cpf.core.domain.aggregates.ladders.events import LadderCreated, LadderBucketAdded


class Ladder(AggregateRoot):

    def __init__(self, id: str) -> None:
        super().__init__(id)
        self.ladder_name: str | None = None
        self.buckets: list[LadderBucket] = []

    def serialize_to_dict(self) -> dict:
        return {
            "ladder_name": self.ladder_name
        }

    @classmethod
    def create_ladder(cls, ladder_name: str) -> "Ladder":
        ladder_uuid = uuid.uuid4()
        instance = cls(id=str(ladder_uuid))
        instance.produce_event(LadderCreated(ladder_name=ladder_name))
        return instance

    @AggregateRoot.produces_events
    def add_new_bucket_to_ladder(
        self,
        bucket_uuid: str,
        band: int
    ) -> LadderBucketAdded:
        return LadderBucketAdded(
            bucket_uuid=bucket_uuid,
            band=band
        )

    # Handlers
    @AggregateRoot.handles_events(LadderBucketAdded)
    def _handle_bucket_added(self, event: LadderBucketAdded) -> None:
        self.buckets.append(
            LadderBucket(bucket_uuid=event.bucket_uuid, band=event.band)
        )

    @AggregateRoot.handles_events(LadderCreated)
    def _handle_ladder_created(self, event: LadderCreated) -> None:
        self.ladder_name = event.ladder_name

    def handle_event(self, event: DomainEvent) -> None:
        raise NotImplementedError(f"Event {event.event_type()} not handled")


@dataclass(frozen=True)
class LadderBucket:
    bucket_uuid: str
    band: int
