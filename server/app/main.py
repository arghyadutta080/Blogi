from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from app.routes import user, auth, post
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Blogi API", version="1.0.0")

origins = [
    "blogi-five.vercel.app",
    "blogi-arghya-dutta-s-projects.vercel.app"
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