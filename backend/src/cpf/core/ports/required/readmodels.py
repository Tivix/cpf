from dataclasses import dataclass, field


@dataclass(frozen=True)
class BucketReadModel:
    @dataclass(frozen=True)
    class AdvancementLevel:

        @dataclass(frozen=True)
        class ExampleProject:
            title: str
            overview: str

        @dataclass(frozen=True)
        class AtomicSkill:
            uuid: str
            name: str
            category: str

        advancement_level: int
        description: str
        projects: list[ExampleProject] = field(default_factory=list)
        atomic_skills: list[AtomicSkill] = field(default_factory=list)

    bucket_slug: str
    bucket_name: str
    description: str

    advancement_levels: list[AdvancementLevel] | None = None


@dataclass(frozen=True)
class LadderReadModel:
    @dataclass(frozen=True)
    class BandReadModel:
        threshold: int
        salary_range: str
        buckets: list[str] = field(default_factory=list)

    uuid: str
    ladder_name: str
    bands: dict[int, BandReadModel] = field(default_factory=dict)


