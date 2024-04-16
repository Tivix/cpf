from dataclasses import asdict

from cpf.core.domain.aggregates.users import events
from cpf.core.domain.aggregates.users.aggregate import (
    HardSkillBucket,
    SoftSkillBucket,
    User,
    UserLadder,
)
from cpf.core.domain.enums import AdvancementLevel, BucketType
from cpf.core.ports.required.readmodels import BucketReadModel


def test_user_creation():
    instance = User.create_user(user_id="john.doe")

    assert instance.aggregate_id == "john.doe"
    assert instance.first_name is None
    assert isinstance(instance.pending_events[0], events.UserCreated)


def test_set_personal_information():
    instance: User = User("john.doe")
    event = instance.set_personal_information(first_name="John", last_name="Doe", email="john.doe@kellton.com")
    # Validate event
    assert isinstance(event, events.UserPersonalInformationSet)
    assert event.first_name == "John"

    # Validate aggregate
    assert instance.first_name == "John"
    assert instance.last_name == "Doe"
    assert instance.email == "john.doe@kellton.com"


def test_assign_new_ladder():
    instance: User = User("john.doe")
    event = instance.assign_new_ladder(
        ladder_slug="backend",
        main_ladder=True,
        hard_skill_buckets_slugs=["programming_language", "framework"],
        soft_skill_buckets_slugs=["soft_skill_1", "soft_skills_2"],
    )
    # Validate aggregate
    assert "backend" in instance.user_ladders
    assert isinstance(event, events.UserLadderSet)

    user_ladder = instance.user_ladders["backend"]
    assert isinstance(user_ladder, UserLadder)
    assert user_ladder.main_ladder

    # Validate hard skill buckets
    assert len(instance.hard_skill_buckets) == 2
    assert "programming_language" in instance.hard_skill_buckets
    assert asdict(instance.hard_skill_buckets["programming_language"]) == {
        "bucket_slug": "programming_language",
        "archived_level": AdvancementLevel.NO_LEVEL,
        "completed_atomic_skills": set(),
    }

    assert len(instance.soft_skill_buckets) == 2


def test_update_progress_hard_skill():
    instance: User = User("john.doe")
    instance.user_ladders = {"backend": UserLadder(ladder_slug="backend", main_ladder=True)}
    instance.hard_skill_buckets = {"programming_language": HardSkillBucket(bucket_slug="programming_language")}
    # Test new atomic added no level granted
    instance.update_progress(
        bucket_type=BucketType.HARD_SKILL,
        bucket_slug="programming_language",
        atomic_skills=[
            "c1d8971d-739b-4aed-b3a2-f06b9433e4e3",
        ],
        new_level_archived=False,
    )

    bucket = instance.hard_skill_buckets["programming_language"]
    assert bucket.archived_level == AdvancementLevel.NO_LEVEL
    assert "c1d8971d-739b-4aed-b3a2-f06b9433e4e3" in bucket.completed_atomic_skills

    # Test new atom added and new level granted
    instance.update_progress(
        bucket_type=BucketType.HARD_SKILL,
        bucket_slug="programming_language",
        atomic_skills=["d459d151-6d15-44c8-8a37-6b70b8652b8a"],
        new_level_archived=True,
    )
    bucket = instance.hard_skill_buckets["programming_language"]
    assert bucket.archived_level == AdvancementLevel.LEVEL_1
    assert "d459d151-6d15-44c8-8a37-6b70b8652b8a" in bucket.completed_atomic_skills


def test_user_has_main_ladder():
    instance: User = User("john.doe")
    assert not instance.has_main_ladder()

    instance.user_ladders = {"backend": UserLadder(ladder_slug="backend", main_ladder=False)}
    assert not instance.has_main_ladder()

    instance.user_ladders = {"backend": UserLadder(ladder_slug="backend", main_ladder=True)}
    assert instance.has_main_ladder()


def test_check_new_level_archived_soft_skills():
    bucket = BucketReadModel(
        bucket_slug="soft_skills_1",
        bucket_name="Soft Skills 1",
        description="",
        bucket_type=BucketType.SOFT_SKILL,
        advancement_levels=[
            BucketReadModel.AdvancementLevel(
                advancement_level=AdvancementLevel.NO_LEVEL.value,
                description="",
                atomic_skills=[
                    BucketReadModel.AdvancementLevel.AtomicSkill(
                        uuid="atomic_skill_uuid_1", name="Atomic skill 1", category="Common"
                    ),
                    BucketReadModel.AdvancementLevel.AtomicSkill(
                        uuid="atomic_skill_uuid_2", name="Atomic skill 2", category="Common"
                    ),
                    BucketReadModel.AdvancementLevel.AtomicSkill(
                        uuid="atomic_skill_uuid_3", name="Atomic skill 3", category="Common"
                    ),
                ],
            ),
        ],
    )
    user = User("john.doe")
    user.soft_skill_buckets = {
        "soft_skills_1": SoftSkillBucket(
            bucket_slug="soft_skill_1", completed=False, completed_atomic_skills={"atomic_skill_uuid_1"}
        )
    }

    assert not user.check_if_soft_skill_bucket_completed(bucket_reference=bucket)

    assert user.check_if_soft_skill_bucket_completed(
        bucket_reference=bucket, new_skills=["atomic_skill_uuid_2", "atomic_skill_uuid_3"]
    )


def test_check_new_level_archived_hard_skills():
    bucket = BucketReadModel(
        bucket_slug="programming_language",
        bucket_name="Programming language",
        description="",
        bucket_type=BucketType.HARD_SKILL,
        advancement_levels=[
            BucketReadModel.AdvancementLevel(
                advancement_level=AdvancementLevel.LEVEL_1.value,
                description="",
                atomic_skills=[
                    BucketReadModel.AdvancementLevel.AtomicSkill(
                        uuid="atomic_skill_uuid_1", name="Atomic skill 1", category="Common"
                    ),
                ],
            ),
            BucketReadModel.AdvancementLevel(
                advancement_level=AdvancementLevel.LEVEL_2.value,
                description="",
                atomic_skills=[
                    BucketReadModel.AdvancementLevel.AtomicSkill(
                        uuid="atomic_skill_uuid_2", name="Atomic skill 2", category="Common"
                    ),
                    BucketReadModel.AdvancementLevel.AtomicSkill(
                        uuid="atomic_skill_uuid_3", name="Atomic skill 3", category="Common"
                    ),
                ],
            ),
            BucketReadModel.AdvancementLevel(
                advancement_level=AdvancementLevel.LEVEL_3.value,
                description="",
                atomic_skills=[
                    BucketReadModel.AdvancementLevel.AtomicSkill(
                        uuid="atomic_skill_uuid_4", name="Atomic skill 4", category="Common"
                    ),
                ],
            ),
        ],
    )
    user = User("john.doe")
    user.hard_skill_buckets = {
        "programming_language": HardSkillBucket(
            bucket_slug="programming_language",
            archived_level=AdvancementLevel.NO_LEVEL,
            completed_atomic_skills={
                "atomic_skill_uuid_3",
            },
        )
    }

    assert user.check_level_of_hard_skill_bucket(bucket_reference=bucket) == AdvancementLevel.NO_LEVEL

    assert (
        user.check_level_of_hard_skill_bucket(bucket_reference=bucket, new_skills=["atomic_skill_uuid_1"])
        == AdvancementLevel.LEVEL_1
    )

    # Check if passing skill from higher advancement not fail calculation
    assert (
        user.check_level_of_hard_skill_bucket(bucket_reference=bucket, new_skills=["atomic_skill_uuid_2"])
        == AdvancementLevel.NO_LEVEL
    )

    # Two advancement jump
    assert (
        user.check_level_of_hard_skill_bucket(
            bucket_reference=bucket, new_skills=["atomic_skill_uuid_1", "atomic_skill_uuid_2"]
        )
        == AdvancementLevel.LEVEL_2
    )

    assert (
        user.check_level_of_hard_skill_bucket(
            bucket_reference=bucket, new_skills=["atomic_skill_uuid_1", "atomic_skill_uuid_2", "atomic_skill_uuid_4"]
        )
        == AdvancementLevel.LEVEL_3
    )
