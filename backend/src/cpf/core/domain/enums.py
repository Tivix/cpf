from enum import Enum


class AdvancementLevel(Enum):
    NO_LEVEL = 0
    LEVEL_1 = 1
    LEVEL_2 = 2
    LEVEL_3 = 3

    @classmethod
    def get_hard_skills_levels(cls) -> list["AdvancementLevel"]:
        return [cls.LEVEL_1, cls.LEVEL_2, cls.LEVEL_3]


class BucketType(Enum):
    HARD_SKILL = "hard"
    SOFT_SKILL = "soft"
