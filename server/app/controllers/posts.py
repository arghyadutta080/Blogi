from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.post import Post
from app.utils.cloudinary import delete_image_from_cloudinary
from app.utils.pagination import paginate_posts

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


def get_post(db: Session, post_id: int, raw: bool = False):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        return None
    if raw:
        return post
    return {
            "author": {
                "id": post.author_id,
                "username": post.author.username
            },
            "post": {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "image_url": post.image_url,
                "image_public_id": post.image_public_id,
                "updated_at": post.updated_at,
                "created_at": post.created_at
            }
        }


def get_all_posts(db: Session, page: int = 1, limit: int = 10, search: str = ""):
    query = db.query(Post).order_by(Post.created_at.desc())

    if search:
        search_filter = or_(
            Post.title.ilike(f"%{search}%"),
            Post.content.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)

    return paginate_posts(query, page, limit)


def get_all_posts_by_user(db: Session, user_id: int, page: int = 1, limit: int = 10):
    query = db.query(Post).filter(Post.author_id == user_id).order_by(Post.created_at.desc())
    return paginate_posts(query, page, limit)


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
