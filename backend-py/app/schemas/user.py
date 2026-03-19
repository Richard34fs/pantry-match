from pydantic import BaseModel, Field, ConfigDict, EmailStr

class UserBase(BaseModel):
    name: str = Field(alias="userName", min_length=1)
    email: EmailStr = Field(alias="userEmail")

    model_config = ConfigDict(populate_by_name=True)

class UserCreate(UserBase):
    password: str = Field(min_length=6)

class UserResponse(UserBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
