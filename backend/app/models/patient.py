from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class PatientRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    phone: Optional[str] = None
    age: Optional[int] = None


class PatientLogin(BaseModel):
    email: EmailStr
    password: str


class PatientResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    age: Optional[int] = None
    role: str
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: PatientResponse
