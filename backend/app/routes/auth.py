from fastapi import APIRouter, Depends
from app.models.patient import PatientRegister, PatientLogin, PatientResponse, TokenResponse
from app.services.auth_service import register_patient, login_patient
from app.middleware.auth import get_current_user

router = APIRouter()


@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(data: PatientRegister):
    return await register_patient(data)


@router.post("/login", response_model=TokenResponse)
async def login(data: PatientLogin):
    return await login_patient(data)


@router.get("/me", response_model=PatientResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"],
        "phone": current_user.get("phone"),
        "age": current_user.get("age"),
        "role": current_user.get("role", "patient"),
        "created_at": current_user["created_at"],
    }
