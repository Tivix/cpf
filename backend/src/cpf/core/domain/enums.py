from enum import Enum


class AdvancementLevel(Enum):
    LEVEL_1 = 1
    LEVEL_2 = 2
    LEVEL_3 = 3


class BucketType(Enum):
    HARD_SKILL = "hard", "Hard skills"
    SOFT_SKILL = "soft", "Soft skills"
