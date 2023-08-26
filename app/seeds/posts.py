from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import randint, choice
from datetime import datetime

faker = Faker()

def fake_posts(post_num, user_num, tag_num):
  posts = []
  for i in range(1, post_num + 1):
    user_id = randint(1, user_num)
    paragraph = f"<p>{faker.text()}</p>"
    width = randint(3, 5) * 100
    length = randint(3, 5) * 100
    link = f"https://picsum.photos/{width}/{length}.jpg?random={i}>"
    image = f"<img src='{link}' width='{width}px' length='{length}px' />"
    content = f"{paragraph}{image}"
    existing_tags = set()
    tags = []
    for j in range(1, randint(1, tag_num + 1)):
      tag = faker.word()
      while tag in existing_tags:
        tag = faker.word()
      existing_tags.add(tag)
      tags.append(tag)
    tags = ", ".join(tags)
    year = randint(2018, 2020)
    month = randint(1, 12)
    day = randint(1, 28)
    hour = randint(0, 23)
    minute = randint(0, 59)
    second = randint(0, 59)
    microsecond = randint(0, 999999)
    created_at = datetime(year, month, day, hour, minute, second, microsecond)
    posts.append(Post(
      user_id = user_id,
      content = content,
      tags = tags,
      created_at = created_at,
    ))
  return posts

posts = fake_posts(30, 10, 3)

def seed_posts():
  _ = [db.session.add(post) for post in posts]
  db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
