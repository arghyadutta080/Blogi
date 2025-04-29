from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.post import PostCreate, PostOut, PostUpdate
from app.controllers import posts
from app.controllers.user import get_current_user
from app.core import getDB

router = APIRouter()

@router.post("/", response_model=PostOut)
def create_post(
    post: PostCreate,
    db: Session = Depends(getDB.get_db),
    current_user=Depends(get_current_user)
):
    return posts.create_post(db, post, user_id=current_user.id)

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
    post: PostUpdate,
    db: Session = Depends(getDB.get_db),
    current_user=Depends(get_current_user)
):
    db_post = posts.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")
    return posts.update_post(db, post_id, post)

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
