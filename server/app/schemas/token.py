from pydantic import BaseModel

class Token(BaseModel):
    username: str | None = None
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

    class Config:
        from_attributes = True