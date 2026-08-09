from fastapi import APIRouter
from app.config.database import client

router = APIRouter()


@router.get("/health")
async def health_check():
    try:
        await client.admin.command("ping")
        db_status = "connected"
    except Exception:
        db_status = "disconnected"

    return {
        "success": True,
        "message": "HealEasy backend is running",
        "database": db_status,
    }
