from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Note

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/details/<int:id>')
@login_required
def current_user_data_test(id):
    """
    Query for current users posts, likes, following, followers
    """
    user = User.query.get(id)
    return user.to_dict_current()

# @user_routes.route('/current/test')
# @login_required
# def current_user_data_test():
#     """
#     Query for current users posts, likes, following, followers
#     """
#     user = User.query.get(1)
#     return user.to_dict_following()

@user_routes.route('/current')
@login_required
def current_user_data():
    """
    Query for current users posts, likes, following, followers
    """
    user = User.query.get(1)
    return user.to_dict_current()


# @user_routes.route("/test")
# def index():
#   posts = Post.query.all()
#   return {'posts': [post.post_to_dict() for post in posts]}

# @user_routes.route("/test2")
# def notes_test():
#   notes = Note.query.all()
#   return {'notes': [note.to_dict() for note in notes]}

@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_general()
