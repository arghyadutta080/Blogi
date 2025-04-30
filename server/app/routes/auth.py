from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.utils.security import verify_password, create_access_token
from app.controllers.user import get_user_by_username, get_current_user
from app.schemas.user import UserOut
from app.models.user import User
from app.utils import getDB

router = APIRouter()

@router.post("/login", response_model=UserOut)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(getDB.get_db)):
    user = get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"id": user.id, "username": user.username, "access_token": access_token, "token_type": "Bearer"}

@router.get("/me", response_model=UserOut)
def get_current_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/logout")
def logout(current_user: User = Depends(get_current_user)):
    return {"message": "Logged out successfully"}