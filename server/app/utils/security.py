from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from app.utils.config import settings
from sqlalchemy.orm import Session
from app.schemas.token import TokenData
from app.models.user import User
from jwt import InvalidTokenError

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(db: Session, token, credentials_exception):
    if settings.ALGORITHM:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            token_data = TokenData(username=username)
        except InvalidTokenError:
            raise credentials_exception
        
        user = db.query(User).filter(User.username == token_data.username).first()
        
        if user is None:
            raise credentials_exception
        return user