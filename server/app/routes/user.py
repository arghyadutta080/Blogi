from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserOut
from app.controllers.user import get_user_by_username, create_user
from app.utils import getDB
from app.utils.security import create_access_token

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(getDB.get_db)):
    db_user = get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    user = create_user(db, user)
    access_token = create_access_token(data={"sub": user.username})
    return {"id": user.id, "username": user.username, "access_token": access_token, "token_type": "Bearer"}
