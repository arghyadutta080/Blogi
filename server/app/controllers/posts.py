from sqlalchemy.orm import Session
from app.models.post import Post
from app.utils.cloudinary import delete_image_from_cloudinary

def create_post(db: Session, title: str, content: str, user_id: int, image_data: dict = None):
    image_url = image_data["url"] if image_data else None
    image_public_id = image_data["public_id"] if image_data else None

    post = Post(
        title=title,
        content=content,
        author_id=user_id,
        image_url=image_url,
        image_public_id=image_public_id
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

def get_all_posts(db: Session):
    return db.query(Post).order_by(Post.created_at.desc()).all()

def update_post(db: Session, db_post: Post, new_title: str, new_content: str, image_data: dict = None):
    db_post.title = new_title
    db_post.content = new_content

    if image_data:
        if db_post.image_public_id:
            delete_image_from_cloudinary(db_post.image_public_id)
        db_post.image_url = image_data["url"]
        db_post.image_public_id = image_data["public_id"]

    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, db_post: Post):
    if db_post.image_public_id:
        delete_image_from_cloudinary(db_post.image_public_id)
    db.delete(db_post)
    db.commit()
