from pydantic import BaseModel
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str
    image_url: str | None = None
    image_public_id: str | None = None

class PostOut(PostBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: datetime | None

    class Config:
        from_attributes = True
