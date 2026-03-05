from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import schemas, models
from app.api.deps import get_current_user
from app.database import get_db
from app.services.ai_service import generate_social_content

router = APIRouter(
    prefix="/api",
    tags=["Posts & AI"]
)

@router.post("/generate-post", response_model=schemas.GenerateResponse)
async def generate_post(
    request: schemas.GenerateRequest,
    current_user: models.User = Depends(get_current_user)
):
    try:
        results = await generate_social_content(request.prompt)
        return {"results": results}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate content: {str(e)}"
        )

@router.post("/save-draft", response_model=schemas.PostOut)
def save_draft(
    request: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_post = models.Post(
        user_id=current_user.id,
        content=request.content,
        platform=request.platform,
        status=models.PostStatus.draft
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.post("/schedule-post", response_model=schemas.ScheduledPostOut)
def schedule_post(
    request: schemas.ScheduleRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # 1. Create the Post
    new_post = models.Post(
        user_id=current_user.id,
        content=request.content,
        platform=request.platform,
        status=models.PostStatus.scheduled
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    # 2. Create the ScheduledPost entry
    scheduled_post = models.ScheduledPost(
        post_id=new_post.id,
        scheduled_time=request.scheduled_time,
        status="pending"
    )
    db.add(scheduled_post)
    db.commit()
    db.refresh(scheduled_post)

    return scheduled_post

@router.get("/scheduled-posts", response_model=List[schemas.ScheduledPostOut])
def get_scheduled_posts(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    scheduled_posts = (
        db.query(models.ScheduledPost)
        .join(models.Post)
        .filter(models.Post.user_id == current_user.id)
        .order_by(models.ScheduledPost.scheduled_time.asc())
        .all()
    )
    return scheduled_posts

@router.delete("/scheduled-posts/{post_id}", status_code=204)
def delete_scheduled_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    scheduled_post = (
        db.query(models.ScheduledPost)
        .join(models.Post)
        .filter(
            models.ScheduledPost.id == post_id,
            models.Post.user_id == current_user.id
        )
        .first()
    )
    if not scheduled_post:
        raise HTTPException(status_code=404, detail="Scheduled post not found")

    # Also delete the parent post
    post = db.query(models.Post).filter(models.Post.id == scheduled_post.post_id).first()
    db.delete(scheduled_post)
    if post:
        db.delete(post)
    db.commit()

@router.get("/analytics", response_model=schemas.DashboardStats)
def get_analytics(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    total_posts = db.query(models.Post).filter(models.Post.user_id == current_user.id).count()
    scheduled_count = (
        db.query(models.ScheduledPost)
        .join(models.Post)
        .filter(
            models.Post.user_id == current_user.id,
            models.ScheduledPost.status == "pending"
        )
        .count()
    )
    # Real analytics from DB (sum across all user's posts)
    analytics_rows = (
        db.query(models.Analytics)
        .join(models.Post)
        .filter(models.Post.user_id == current_user.id)
        .all()
    )
    total_likes = sum(r.likes for r in analytics_rows)
    total_impressions = sum(r.impressions for r in analytics_rows)

    return {
        "impressions": total_impressions,
        "likes": total_likes,
        "followers": 0,
        "engagement_rate": round((total_likes / total_impressions * 100), 1) if total_impressions > 0 else 0,
        "total_posts": total_posts,
        "scheduled_count": scheduled_count,
    }

@router.post("/connect-platform")
def connect_platform(
    request: schemas.ConnectPlatformRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Simulate OAuth platform connection
    existing = db.query(models.ConnectedPlatform).filter(
        models.ConnectedPlatform.user_id == current_user.id,
        models.ConnectedPlatform.platform == request.platform
    ).first()
    
    if existing:
        return {"status": "success", "message": f"{request.platform} already connected"}
        
    new_connection = models.ConnectedPlatform(
        user_id=current_user.id,
        platform=request.platform
    )
    db.add(new_connection)
    db.commit()
    
    return {"status": "success", "message": f"Successfully connected to {request.platform}"}
