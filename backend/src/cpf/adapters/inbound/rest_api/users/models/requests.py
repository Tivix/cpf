from pydantic import BaseModel, EmailStr, Field


class PutUser(BaseModel):
    first_name: str = Field(..., description="New user first name")
    last_name: str = Field(..., description="New user last name")
    email: EmailStr = Field(..., description="New user email")
