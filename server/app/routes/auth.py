from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.schemas.token import Token
from app.utils.security import verify_password, create_access_token
from app.controllers.user import get_user_by_username
from app.utils import getDB

router = APIRouter()

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(getDB.get_db)):
    user = get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"username": user.username, "access_token": access_token, "token_type": "bearer"}


@router.get("/logout")
def logout():
    return {"message": "Logged out successfully"}