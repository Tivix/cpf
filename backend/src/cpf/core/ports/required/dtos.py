from dataclasses import dataclass


@dataclass(frozen=True)
class LadderDetailDTO:

    @dataclass(frozen=True)
    class BucketDTO:
        bucket_slug: str
        bucket_name: str
        description: str

    @dataclass(frozen=True)
    class BandDTO:
        threshold: int
        salary_range: str
        hard_skill_buckets: list["LadderDetailDTO.BucketDTO"]
        soft_skill_buckets: list["LadderDetailDTO.BucketDTO"]

    ladder_name: str
    bands: dict[int, BandDTO]
