def paginate_posts(query, page: int = 1, limit: int = 10):
    total = query.count()
    offset = (page - 1) * limit
    posts = query.offset(offset).limit(limit).all()

    formatted_posts = [
        {
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
        for post in posts
    ]

    return {
        "posts": formatted_posts,
        "total": total,
        "page": page,
        "limit": limit
    }