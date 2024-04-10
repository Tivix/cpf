from dataclasses import dataclass, field

from cpf.core.domain.aggregates.aggregate_root import AggregateRoot
from cpf.core.domain.aggregates.domain_event import DomainEvent
from cpf.core.domain.aggregates.ladders.events import (
    BandSet,
    LadderBucketAdded,
    LadderCreated,
)


class Ladder(AggregateRoot):

    def __init__(self, id: str) -> None:
        super().__init__(id)
        self.ladder_name: str | None = None
        self.bands: dict[int, Band] = {}

    def serialize_to_dict(self) -> dict:
        return {
            "ladder_name": self.ladder_name,
            "bands": {
                index: {
                    "threshold": band.threshold,
                    "salary_range": band.salary_range,
                    "buckets": [{"bucket_slug": bucket.bucket_slug} for bucket in band.buckets],
                }
                for index, band in self.bands.items()
            },
        }

    @classmethod
    def create_ladder(cls, ladder_slug: str, ladder_name: str) -> "Ladder":
        instance = cls(id=str(ladder_slug))
        instance.produce_event(LadderCreated(ladder_name=ladder_name))
        return instance

    @AggregateRoot.produces_events
    def add_new_bucket_to_band(self, bucket_slug: str, band: int) -> LadderBucketAdded:
        if band not in self.bands:
            raise ValueError("Band does not exists!")

        return LadderBucketAdded(bucket_slug=bucket_slug, band=band)

    @AggregateRoot.produces_events
    def set_new_band(self, threshold: int, salary_range: str, band_index: int) -> BandSet:
        if band_index in self.bands:
            raise ValueError("Band already exists")
        return BandSet(threshold=threshold, salary_range=salary_range, band_index=band_index)

    # Handlers
    @AggregateRoot.handles_events(LadderBucketAdded)
    def _handle_bucket_added(self, event: LadderBucketAdded) -> None:
        self.bands[event.band].buckets.append(LadderBucket(bucket_slug=event.bucket_slug))

    @AggregateRoot.handles_events(BandSet)
    def _handle_band_set(self, event: BandSet) -> None:
        self.bands[event.band_index] = Band(threshold=event.threshold, salary_range=event.salary_range)

    @AggregateRoot.handles_events(LadderCreated)
    def _handle_ladder_created(self, event: LadderCreated) -> None:
        self.ladder_name = event.ladder_name

    def handle_event(self, event: DomainEvent) -> None:
        raise NotImplementedError(f"Event {event.event_type()} not handled")


@dataclass(frozen=True)
class LadderBucket:
    bucket_slug: str


@dataclass(frozen=True)
class Band:
    threshold: int
    salary_range: str
    buckets: list[LadderBucket] = field(default_factory=list)
