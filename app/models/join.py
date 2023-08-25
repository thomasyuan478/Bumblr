from .db import db, environment, SCHEMA, add_prefix_for_prod


likes = db.Table(
  'user_likes',
  db.Model.metadata,
  db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
  db.Column("posts", db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), primary_key=True)
)

follows = db.Table(
    "follows",
    db.Model.metadata,
    db.Column("follower", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("followed", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True)
)


if environment == "production":
    likes.schema = SCHEMA
    follows.schema = SCHEMA
