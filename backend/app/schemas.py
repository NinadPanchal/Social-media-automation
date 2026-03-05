from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# --- Auth Schemas ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Post Schemas ---
class PostCreate(BaseModel):
    content: str
    platform: str

class PostOut(BaseModel):
    id: int
    content: str
    platform: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class ScheduleRequest(BaseModel):
    content: str
    platform: str
    scheduled_time: datetime

class ScheduledPostOut(BaseModel):
    id: int
    post_id: int
    scheduled_time: datetime
    status: str
    post: PostOut

    class Config:
        from_attributes = True

# --- AI Schemas ---
class GenerateRequest(BaseModel):
    prompt: str

class GeneratedContent(BaseModel):
    platform: str
    content: str

class GenerateResponse(BaseModel):
    results: List[GeneratedContent]

# --- Analytics Schemas ---
class AnalyticsOut(BaseModel):
    id: int
    post_id: int
    likes: int
    shares: int
    comments: int
    impressions: int

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    impressions: int
    likes: int
    followers: int
    engagement_rate: float
    total_posts: int = 0
    scheduled_count: int = 0
    
class ConnectPlatformRequest(BaseModel):
    platform: str
