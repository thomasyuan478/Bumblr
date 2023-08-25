from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import randint, choice
from datetime import datetime
from .users import users
from .posts import posts

faker = Faker()

def fake_likes(posts, users):
  user_num = len(users)
  post_num = len(posts)
  for user in users:
    like_num = randint(1, post_num)
    likes = []
    existing_likes = set()
    for i in range(1, like_num + 1):
      post = choice(posts)
      while post.id in existing_likes:
        post = choice(posts)
      existing_likes.add(post.id)
      likes.append(post)
    user.likes = likes
  return users

def seed_likes():
  likes = fake_likes(posts, users)
  db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_likes"))

    db.session.commit()
