from cpf.core.domain.aggregates.buckets.aggregate import Bucket
from cpf.core.domain.aggregates.ladders.aggregate import Ladder
from cpf.core.domain.enums import BucketType
from cpf.core.ports.provided.services import ManageService
from cpf.core.ports.required.daos import BucketReadModelDao, LadderReadModelDao
from cpf.core.ports.required.writemodels import Repository


class LadderManageService(ManageService):

    def __init__(self, ladder_repository: Repository[Ladder], bucket_repository: Repository[Bucket], ladder_dao: LadderReadModelDao, bucket_dao: BucketReadModelDao):
        self._ladder_repository = ladder_repository
        self._bucket_repository = bucket_repository
        self._bucket_dao = bucket_dao
        self._ladder_dao = ladder_dao

    def create_new_ladder(self, ladder_name: str, initial_data: dict | None = None) -> str:
        aggregate: Ladder = Ladder.create_ladder(ladder_name=ladder_name)
        if initial_data:
            # Assign buckets to ladder
            # TODO Create logic to assign buckets from json file
            pass
        self._ladder_repository.save(aggregate)
        self._ladder_dao.save(uuid=aggregate.aggregate_id, serialize_data=aggregate.serialize_to_dict())
        return aggregate.aggregate_id

    def add_new_bucket_to_ladder(self, ladder_uuid: str, bucket_uuid: str, band: int):
        aggregate: Ladder | None = self._ladder_repository.load(ladder_uuid)
        if not aggregate:
            raise ValueError(f"Ladder with {ladder_uuid} doesn't exists")

        # Check if bucket exists
        if not self._bucket_dao.check_if_bucket_exists(bucket_uuid=bucket_uuid):
            raise ValueError(f"Bucket with {bucket_uuid} doesn't exists")

        aggregate.add_new_bucket_to_ladder(
            bucket_uuid=bucket_uuid,
            band=band
        )
        self._ladder_repository.save(aggregate)
        self._ladder_dao.save(uuid=ladder_uuid, serialize_data=aggregate.serialize_to_dict())

    def create_bucket(self, bucket_name: str) -> str:
        aggregate: Bucket = Bucket.create_bucket(
            bucket_name="First bucket",
            bucket_type=BucketType.HARD_SKILL
        )
        self._bucket_repository.save(aggregate)
        self._bucket_dao.save(uuid=aggregate.aggregate_id, serialize_data=aggregate.serialize_to_dict())
        return aggregate.aggregate_id
