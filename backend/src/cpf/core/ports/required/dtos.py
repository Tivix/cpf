from dataclasses import dataclass


@dataclass(frozen=True)
class LadderDetailDTO:

    @dataclass(frozen=True)
    class Bucket:
        bucket_slug: str
        bucket_name: str
        description: str

    @dataclass(frozen=True)
    class Band:
        threshold: int
        salary_range: str
        buckets: list["LadderDetailDTO.Bucket"]

    ladder_name: str
    bands: dict[int, Band]

