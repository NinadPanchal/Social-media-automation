import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from datetime import datetime, timezone
from ..database import SessionLocal
from ..models import ScheduledPost, PostStatus

logger = logging.getLogger(__name__)

def check_scheduled_posts():
    """
    Periodic task to check for scheduled posts that are due.
    In a real system, this would queue a Celery task per post.
    For this prototype, we'll just mark them as published.
    """
    logger.info(f"[{datetime.now()}] Checking for due scheduled posts...")
    db = SessionLocal()
    try:
        now = datetime.now(timezone.utc)
        
        # Find posts that are due and still pending
        due_posts = db.query(ScheduledPost).filter(
            ScheduledPost.status == "pending",
            ScheduledPost.scheduled_time <= now
        ).all()
        
        for sp in due_posts:
            logger.info(f"Publishing scheduled post ID: {sp.id} (Post ID: {sp.post_id})")
            
            # 1. In reality: Call platform API here (Instagram/Twitter/LinkedIn)
            # 2. Mark as completed
            sp.status = "completed"
            
            # 3. Update parent post status
            if sp.post:
                sp.post.status = PostStatus.published
                
        if due_posts:
            db.commit()
            logger.info(f"Successfully published {len(due_posts)} posts.")
            
    except Exception as e:
        logger.error(f"Error in scheduler worker: {e}")
    finally:
        db.close()

def start_scheduler():
    """Start the background scheduler"""
    scheduler = BackgroundScheduler()
    # Check every minute
    scheduler.add_job(
        func=check_scheduled_posts,
        trigger=IntervalTrigger(minutes=1),
        id='publish_due_posts',
        name='Publish Due Scheduled Posts',
        replace_existing=True
    )
    scheduler.start()
    logger.info("Background scheduler started.")
    return scheduler

# Note on Celery Upgrade Path:
# To move to Celery, you would replace this APScheduler with:
# app.task(name='publish_post')
# def publish_post_task(post_id):
#     ... publishing logic ...
#
# And in posts.py:
# publish_post_task.apply_async(args=[post.id], eta=scheduled_time)
