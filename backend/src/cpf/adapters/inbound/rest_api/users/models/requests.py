from pydantic import BaseModel, EmailStr, Field


class PutUser(BaseModel):
    first_name: str = Field(..., description="New user first name")
    last_name: str = Field(..., description="New user last name")
    email: EmailStr = Field(..., description="New user email")


class UserProgress(BaseModel):
    atomic_skills: list[str] = Field(..., description="Archived skills")
    bucket_slug: str = Field(..., description="Bucket slug")
