from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api import auth, posts

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AutoSocial AI API",
    description="Backend API for Social Media Automation",
    version="0.1.0"
)

# CORS setup for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(posts.router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
