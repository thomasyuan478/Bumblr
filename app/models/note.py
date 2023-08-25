from .db import db, environment, SCHEMA, add_prefix_for_prod

class Note(db.Model):
  __tablename__ = "notes"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
  comment = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime(), nullable=False)

  # Relationships
  user = db.relationship("User", back_populates="comments")
  post = db.relationship("Post", back_populates="comments")
