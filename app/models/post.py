from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
  __tablename__ = "posts"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  content = db.Column(db.Text())
  tags = db.Column(db.Text())
  created_at = db.Column(db.DateTime(), nullable=False)

  # Relationships
  user = db.relationship("User", back_populates="posts")
  comments = db.relationship("Note", back_populates="post")
  likes = db.relationship(
    "User",
    secondary="user_likes",
    back_populates="likes"
  )

  # def post_to_dict(self):
  #   return {
  #     "id": self.id,
  #     "content": self.content,
  #     "tags": self.tags,
  #     "createdAt": self.created_at,
  #     "user": self.user.to_dict_no_post()
  #   }


  # def post_to_dict_no_user(self):
  #   return {
  #     "id": self.id,
  #     "content": self.content,
  #     "tags": self.tags,
  #     "createdAt": self.created_at
  #   }