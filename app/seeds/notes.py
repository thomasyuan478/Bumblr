from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import randint, choice
from datetime import datetime

faker = Faker()

def fake_note(note_num, user_num, post_num):
  notes = []
  for i in range(1, note_num + 1):
    user_id = randint(1, user_num)
    post_id = randint(1, post_num)
    comment = faker.text()
    year = randint(2021, 2022)
    month = randint(1, 12)
    day = randint(1, 28)
    hour = randint(0, 23)
    minute = randint(0, 59)
    second = randint(0, 59)
    microsecond = randint(0, 999999)
    created_at = datetime(year, month, day, hour, minute, second, microsecond)
    notes.append(Note(
      user_id = user_id,
      post_id = post_id,
      comment = comment,
      created_at = created_at,
    ))
  return notes

def seed_notes():
  notes = fake_note(90, 10, 30)
  _ = [db.session.add(note) for note in notes]
  db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
