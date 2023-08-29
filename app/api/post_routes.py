from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Note

post_routes = Blueprint('posts', __name__)

@post_routes.route("")
def index():
  posts = Post.query.all()
  return {'posts': [post.post_to_dict_notes() for post in posts]}

# @post_routes.route("/comments")
# def comments():
#   posts = Post.query.all()
#   return {'posts': [post.post_to_dict_notes() for post in posts]}
