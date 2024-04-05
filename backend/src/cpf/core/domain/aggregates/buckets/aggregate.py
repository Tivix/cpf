import uuid
from cpf.core.domain.aggregates.aggregate_root import AggregateRoot
from cpf.core.domain.aggregates.buckets.events import BucketCreated
from cpf.core.domain.aggregates.domain_event import DomainEvent
from cpf.core.domain.enums import AdvancementLevel, BucketType


class Bucket(AggregateRoot):

    def __init__(self, id: str) -> None:
        super().__init__(id)
        self.bucket_name: str | None = None
        self.bucket_type: BucketType | None = None

    def serialize_to_dict(self) -> dict:
        return {
            "bucket_name": self.bucket_name,
            "bucket_type": self.bucket_type.value
        }

    @classmethod
    def create_bucket(cls, bucket_name: str, bucket_type: BucketType) -> "Bucket":
        bucket_uuid = uuid.uuid4()
        instance = cls(str(bucket_uuid))
        instance.produce_event(BucketCreated(bucket_name, bucket_type.value))
        return instance

    @AggregateRoot.handles_events(BucketCreated)
    def _handle_bucket_created(self, event: BucketCreated) -> None:
        self.bucket_name = event.bucket_name
        self.bucket_type = BucketType(event.bucket_type)

    def handle_event(self, event: DomainEvent) -> None:
        raise NotImplementedError(f"Event {event.event_type()} not handled")


class AtomicSkill:
    def __init__(
        self,
        name: str,
        category: str,
        advancement_level: AdvancementLevel | None
    ) -> None:
        self.name = name
        self.category = category
        self.advancement_level = advancement_level
