from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MONGODB_URI: str
    DATABASE_NAME: str = "healeasy"
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200
    FRONTEND_URL: str = "http://localhost:5173"

    class Config:
        env_file = ".env"


settings = Settings()
