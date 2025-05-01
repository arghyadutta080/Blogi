from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from app.routes import user, auth, post
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Blogi API", version="1.0.0")

origins = [
    "https://blogi-dgc66qhgq-arghya-dutta-s-projects.vercel.app",
    "https://blogi-ashen.vercel.app",
    "https://blogi-git-master-arghya-dutta-s-projects.vercel.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/api/v1/user", tags=["Users"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(post.router, prefix="/api/v1/posts", tags=["Posts"])