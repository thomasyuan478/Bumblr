from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Post, Note
from app import db
from app.forms import PostForm, NoteForm
from datetime import datetime

import random

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

@post_routes.route("/new", methods=["POST"])
@login_required
def create_post():
  form = PostForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    post = Post(
      user_id = form.data["user_id"],
      content = form.data["content"],
      tags = form.data["tags"],
      created_at = datetime.today()
    )
    db.session.add(post)
    db.session.commit()
    return {'post': post.post_to_dict_notes()}
  return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@post_routes.route("/<int:id>/notes", methods=["POST"])
@login_required
def add_comment(id):
  """
  add comment to a post
  """
  form = NoteForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    note = Note(
      user_id = form.data["user_id"],
      post_id = form.data["post_id"],
      comment = form.data["comment"],
      created_at = datetime.today()
    )
    db.session.add(note)
    db.session.commit()
    post = Post.query.get(id)
    return {
      'post': post.post_to_dict_notes()
      }
  return {"errors": form.errors}

@post_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_post_pathway(id):
  form = PostForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  post = Post.query.get(id)
  if not post:
    return {"errors": ["post is not found"]}, 404

  if current_user.id != post.user_id:
    return {"errors": ["you are not authorized to edit this post"]}, 403

  if form.validate_on_submit():
    post.content = form.data["content"]
    post.tags = form.data["tags"]
    db.session.commit()
    return {'post': post.post_to_dict_notes()}
  return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@post_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post(id):
  post = Post.query.get(id)
  if not post:
    return {"errors": ["post is not found"]}, 404

  if current_user.id != post.user_id:
    return {"errors": ["you are not authorized to edit this post"]}, 403
  db.session.delete(post)
  db.session.commit()
  return {"message": "post deleted"}

@post_routes.route("/<int:postId>/likes/<int:userId>", methods=["POST"])
def add_like(postId, userId):
  post = Post.query.get(postId)
  user = User.query.get(userId)
  print(post.likes)
  post.likes.append(user)
  print(post.likes)
  db.session.commit()
  return {"post": post.post_to_dict_notes()}

@post_routes.route("/<int:postId>/likes/<int:userId>", methods=["DELETE"])
def remove_like(postId, userId):
  post = Post.query.get(postId)
  user = User.query.get(userId)
  print(post.likes)
  post.likes.remove(user)
  print(post.likes)
  db.session.commit()
  return {"post": post.post_to_dict_notes()}

@post_routes.route("/initialState/<int:userId>")
def initial_state(userId):
  if userId:
    response = {}
    posts = Post.query.all()
    response['posts'] = {"posts": [post.post_to_dict_notes() for post in posts]}
    users = User.query.all()
    response['users'] = {"users": [user.to_dict_current_summary() for user in users]}
    user = User.query.get(userId)
    singleUser = user.to_dict_current()
    response['singleUser'] = singleUser
    return {"Response": response}
  response = {}
  posts = Post.query.all()
  response['posts'] = {"posts": [post.post_to_dict_notes() for post in posts]}
  users = User.query.all()
  response['users'] = {"users": [user.to_dict() for user in users]}
  return {"Response": response}
