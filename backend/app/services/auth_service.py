from datetime import datetime
from fastapi import HTTPException, status
from app.config.database import get_db
from app.models.patient import PatientRegister, PatientLogin
from app.utils.security import hash_password, verify_password, create_access_token
from bson import ObjectId


def _format_user(user: dict) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user.get("phone"),
        "age": user.get("age"),
        "role": user.get("role", "patient"),
        "created_at": user["created_at"],
    }


async def register_patient(data: PatientRegister) -> dict:
    db = get_db()

    existing = await db["patients"].find_one({"email": data.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    patient_doc = {
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "phone": data.phone,
        "age": data.age,
        "role": "patient",
        "created_at": datetime.utcnow(),
    }

    result = await db["patients"].insert_one(patient_doc)
    patient_doc["_id"] = result.inserted_id

    token = create_access_token({"sub": str(result.inserted_id)})
    return {"access_token": token, "token_type": "bearer", "user": _format_user(patient_doc)}


async def login_patient(data: PatientLogin) -> dict:
    db = get_db()

    user = await db["patients"].find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token({"sub": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer", "user": _format_user(user)}
