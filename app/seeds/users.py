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
    "/images/avatar/avatar1",
    "/images/avatar/avatar2",
    "/images/avatar/avatar3",
    "/images/avatar/avatar4",
    "/images/avatar/avatar5",
    "/images/avatar/avatar6",
    "/images/avatar/avatar7",
    "/images/avatar/avatar8",
    "/images/avatar/avatar9",
    "/images/avatar/avatar10"
  ]
  banner_pics = [
    "/images/banner/background1",
    "/images/banner/background2",
    "/images/banner/background3",
    "/images/banner/background4",
    "/images/banner/background5",
    "/images/banner/background6",
    "/images/banner/background7",
    "/images/banner/background8",
    "/images/banner/background9",
    "/images/banner/background10",
    "/images/banner/background11",
    "/images/banner/background12",
    "/images/banner/background13",
    "/images/banner/background14"
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

# def fake_follows(users):
#   user_num = len(users)
#   for user in users:
#     follower_num = randint(1, user_num // 2)
#     followers = []
#     existing_followers = set()
#     for i in range(1, follower_num + 1):
#       follower = choice(users)
#       while (follower.id in existing_followers) or follower.id == user.id:
#         follower = choice(users)
#       existing_followers.add(follower.id)
#       followers.append(follower)
#     user.followers = followers
#   return users


users = fake_users(10)
# Adds a demo user, you can add other users here if you want
def seed_users():
    # users = fake_follows(users)
    # follows = fake_follows(users)

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
