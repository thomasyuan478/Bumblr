from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import randint, choice
from datetime import datetime
from .users import users

faker = Faker()

def fake_follows(users):
  user_num = len(users)
  for user in users:
    follower_num = randint(1, user_num - 1)
    followers = []
    existing_followers = {user.username}
    for i in range(1, follower_num + 1):
      follower = choice(users)
      while (follower.username in existing_followers):
        follower = choice(users)
      existing_followers.add(follower.username)
      followers.append(follower)
    user.followers = followers
  return users

def seed_follows():
    fake_follows(users)
    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
