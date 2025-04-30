from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.post import PostOut
from app.controllers import posts
from app.controllers.user import get_current_user
from app.utils import getDB
from app.utils.cloudinary import upload_image_to_cloudinary

router = APIRouter()

@router.post("/create", response_model=PostOut)
def create_post(
    title: str = File(...),
    content: str= File(...),
    image: Optional[UploadFile] = File(None) | None,
    db: Session = Depends(getDB.get_db),
    current_user=Depends(get_current_user)
):
    image_data = upload_image_to_cloudinary(image) if image else None
    return posts.create_post(db, title=title, content=content, user_id=current_user.id, image_data=image_data)

@router.get("/", response_model=List[PostOut])
def read_posts(db: Session = Depends(getDB.get_db)):
    return posts.get_all_posts(db)

@router.get("/{post_id}", response_model=PostOut)
def read_post(post_id: int, db: Session = Depends(getDB.get_db)):
    db_post = posts.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@router.put("/{post_id}", response_model=PostOut)
def update_post(
    post_id: int,
    title: str = File(...),
    content: str = File(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(getDB.get_db),
    current_user=Depends(get_current_user)
):
    db_post = posts.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")
    
    image_data = upload_image_to_cloudinary(image) if image else None
    return posts.update_post(db, db_post, new_title=title, new_content=content, image_data=image_data)

@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(getDB.get_db),
    current_user=Depends(get_current_user)
):
    db_post = posts.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")
    posts.delete_post(db, post_id)
    return {"msg": "Post deleted successfully"}
