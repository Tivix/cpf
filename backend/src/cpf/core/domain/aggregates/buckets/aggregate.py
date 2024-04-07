import uuid
from dataclasses import dataclass, field

from cpf.core.domain.aggregates.aggregate_root import AggregateRoot
from cpf.core.domain.aggregates.buckets.events import BucketCreated, AtomicSkillSet, AdvancementLevelUpdate, \
    ExampleProjectSet, BucketUpdated
from cpf.core.domain.aggregates.domain_event import DomainEvent
from cpf.core.domain.enums import AdvancementLevel, BucketType


class Bucket(AggregateRoot):

    def __init__(self, slug: str) -> None:
        super().__init__(slug)
        self.bucket_name: str | None = None
        self.bucket_type: BucketType | None = None
        self.description: str = ""
        self.levels: dict[AdvancementLevel, Advancement] = {}

    def serialize_to_dict(self) -> dict:
        # TODO Move this logic to Dao using pydantic models
        return {
            "bucket_name": self.bucket_name,
            "bucket_type": self.bucket_type.value,
            "description": self.description,
            "advancement_levels": [
                {
                    "advancement_level": item.level.value,
                    "description": item.description,
                    "projects": [
                        {
                            "title": project.title,
                            "overview": project.overview

                        } for project in item.projects.values()
                    ],
                    "atomic_skills": [
                        {
                            "uuid": skill.uuid,
                            "name": skill.name,
                            "category": skill.category
                        } for skill in item.atomic_skills.values()
                    ]
                } for item in self.levels.values()
            ]
        }

    @classmethod
    def create_bucket(cls, bucket_slug: str, bucket_name: str, bucket_type: BucketType) -> "Bucket":
        instance = cls(bucket_slug)
        instance.produce_event(BucketCreated(bucket_name, bucket_type.value))
        return instance

    @AggregateRoot.produces_events
    def update_bucket_information(
        self,
        description: str
    ) -> BucketUpdated:
        return BucketUpdated(
            description=description
        )

    @AggregateRoot.produces_events
    def set_atomic_skill(
        self,
        skill_uuid: str | None,
        name: str,
        advancement_level: AdvancementLevel | None,
        category: str | None,
    ) -> AtomicSkillSet:
        if not category and self.bucket_type == BucketType.SOFT_SKILL:
            raise ValueError("Soft skill needs to have category")
        if not advancement_level and self.bucket_type == BucketType.HARD_SKILL:
            raise ValueError("Hard skill requires advancement level")

        if not skill_uuid:
            skill_uuid = str(uuid.uuid4())

        return AtomicSkillSet(
            uuid=skill_uuid,
            name=name,
            advancement_level=advancement_level.value if advancement_level else None,
            category=category
        )

    @AggregateRoot.produces_events
    def update_advancement_level(
        self,
        advancement_level: AdvancementLevel,
        description: str
    ) -> AdvancementLevelUpdate:
        if advancement_level == AdvancementLevel.NO_LEVELS and self.bucket_type == BucketType.HARD_SKILL:
            raise ValueError("No level advancement is not set for hard skill bucket")

        return AdvancementLevelUpdate(
            advancement_level=advancement_level.value,
            description=description
        )

    @AggregateRoot.produces_events
    def set_example_project(
        self,
        project_uuid: str | None,
        advancement_level: AdvancementLevel,
        title: str,
        overview: str
    ) -> ExampleProjectSet:
        if not project_uuid:
            project_uuid = str(uuid.uuid4())

        return ExampleProjectSet(
            advancement_level=advancement_level.value,
            uuid=project_uuid,
            title=title,
            overview=overview
        )

    # TODO Implement delete existing projects and atomic skills

    # HANDLERS
    @AggregateRoot.handles_events(ExampleProjectSet)
    def _handle_example_project_set(self, event: ExampleProjectSet) -> None:
        level = AdvancementLevel(event.advancement_level)
        self.levels[level].projects[event.uuid] = ExampleProject(
            uuid=event.uuid,
            title=event.title,
            overview=event.overview
        )

    @AggregateRoot.handles_events(BucketUpdated)
    def _handle_bucket_updated(self, event: BucketUpdated):
        self.description = event.description

    @AggregateRoot.handles_events(AdvancementLevelUpdate)
    def _handle_advancement_level_update(self, event: AdvancementLevelUpdate) -> None:
        level = AdvancementLevel(event.advancement_level)
        self.levels[level].description = event.description

    @AggregateRoot.handles_events(AtomicSkillSet)
    def _handle_atomic_skill_set(self, event: AtomicSkillSet) -> None:
        level = AdvancementLevel(event.advancement_level)
        self.levels[level].atomic_skills[event.uuid] = AtomicSkill(
            uuid=event.uuid,
            name=event.name,
            category=event.category
        )

    @AggregateRoot.handles_events(BucketCreated)
    def _handle_bucket_created(self, event: BucketCreated) -> None:
        self.bucket_name = event.bucket_name
        self.bucket_type = BucketType(event.bucket_type)

        if self.bucket_type == BucketType.HARD_SKILL:
            for skill_level in AdvancementLevel.get_hard_skills_levels():
                self.levels[skill_level] = Advancement(
                    level=skill_level,
                )
        else:
            self.levels[AdvancementLevel.NO_LEVELS] = Advancement(
                level=AdvancementLevel.NO_LEVELS
            )

    def handle_event(self, event: DomainEvent) -> None:
        raise NotImplementedError(f"Event {event.event_type()} not handled")


@dataclass
class ExampleProject:
    uuid: str
    title: str
    overview: str


@dataclass
class AtomicSkill:
    uuid: str
    name: str
    category: str | None


@dataclass
class Advancement:
    level: AdvancementLevel
    description: str = field(default="")
    projects: dict[str, ExampleProject] = field(default_factory=dict)
    atomic_skills: dict[str, AtomicSkill] = field(default_factory=dict)
