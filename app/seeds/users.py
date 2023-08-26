from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import randint, choice
from datetime import datetime

faker = Faker()

def fake_users(user_num):
  existing_name = set()
  users = []
  profile_pics = [
    "/images/avatar/avatar1.png",
    "/images/avatar/avatar2.png",
    "/images/avatar/avatar3.png",
    "/images/avatar/avatar4.png",
    "/images/avatar/avatar5.png",
    "/images/avatar/avatar6.png",
    "/images/avatar/avatar7.png",
    "/images/avatar/avatar8.png",
    "/images/avatar/avatar9.png",
    "/images/avatar/avatar10.png"
  ]
  banner_pics = [
    "/images/banner/background1.png",
    "/images/banner/background2.png",
    "/images/banner/background3.png",
    "/images/banner/background4.png",
    "/images/banner/background5.png",
    "/images/banner/background6.png",
    "/images/banner/background7.png",
    "/images/banner/background8.png",
    "/images/banner/background9.png",
    "/images/banner/background10.png",
    "/images/banner/background11.png",
    "/images/banner/background12.png",
    "/images/banner/background13.png",
    "/images/banner/background14.png"
  ]
  for i in range(1, user_num + 1):
    name = faker.name()
    while name in existing_name:
      name = faker.name()
    existing_name.add(name)
    first_name = name.split(" ")[0].lower()
    last_name = name.split(" ")[1].lower()
    username = first_name + str(randint(0, 9999)).rjust(4, "0")
    email = f"{first_name}.{last_name}@bumblr.com"
    profile_pic = choice(profile_pics)
    banner_pic = choice(banner_pics)
    password = f"password{i}"
    users.append(User(
      username = username,
      email = email,
      profile_pic = profile_pic,
      banner_pic = banner_pic,
      password = password
    ))
  return users

users = fake_users(10)
# Adds a demo user, you can add other users here if you want
def seed_users():
    _ = [db.session.add(user) for user in users]
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
