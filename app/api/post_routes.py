from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Note
from app import db

import random

post_routes = Blueprint('posts', __name__)

@post_routes.route("")
def index():
  posts = Post.query.all()
  return {'posts': [post.post_to_dict_notes() for post in posts]}

# @post_routes.route("/comments")
# def comments():
#   posts = Post.query.all()
#   return {'posts': [post.post_to_dict_notes() for post in posts]}

test = [
  "<p> Interesting <p>",
  "<p> That's cool <p>",
  "<p> THis is a rudimentary update feature <p>",
  "<p> love me some tacos <p>",
  "<p> eat more cookies <p>",
  "<p> Tumblr is the cooliest <p>",
  "<p> Wow This is an ugly site <p>",
  "<p> Dreamworks entertianment peresnts. <p>",
]

@post_routes.route("/<int:id>", methods=["PUT"])
def update_post_pathway(id):
  post = Post.query.get(id)
  print(post)
  post.content = random.choice(test)
  post.tags = "Hello, Goodbye, Curious"
  db.session.commit()
  return {'post': post.post_to_dict_notes()}

@post_routes.route("/<int:id>", methods=["DELETE"])
def delete_post(id):
  post = Post.query.get(id)
  db.session.delete(post)
  db.session.commit()
  return {"message": "post deleted"}
