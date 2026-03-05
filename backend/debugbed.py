import asyncio
from app.database import SessionLocal
from app.models import User
from app.api.auth import register
from app.schemas import UserCreate

db = SessionLocal()
try:
    user = UserCreate(email="test2@example.com", password="password123")
    result = register(user, db)
    print("Success:", result)
except Exception as e:
    import traceback
    traceback.print_exc()
finally:
    db.close()
