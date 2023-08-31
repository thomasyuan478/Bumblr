from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, logout_user, login_user
from app.models import User, Post, Note, db
from app.forms import ProfileUpdateForm, PasswordUpdateForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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
def current_user_data(id):
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

# @user_routes.route('/current')
# @login_required
# def current_user_data():
#     """
#     Query for current users posts, likes, following, followers
#     """
#     user = User.query.get(1)
#     return user.to_dict_current()


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

@user_routes.route('/<int:id>/profile', methods=["PUT"])
@login_required
def update_user_profile(id):
    """
    Update a user's profile, including username, email,
    password, banner pic, and profile pic
    """
    form = ProfileUpdateForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    user = User.query.get(id)

    if not user:
        return {"errors": "user is not found"}, 404

    if current_user.id != id:
        return {"errors": "you are not authorized to edit the profile of this user"}, 403

    if form.validate_on_submit():
        user.username = form.data["username"]
        user.email = form.data["email"]
        user.nickname = form.data["nickname"]
        user.bio = form.data["bio"]
        user.banner_pic = form.data["banner_pic"]
        user.profile_pic = form.data["profile_pic"]

        db.session.commit()
        return {"user": user.to_dict_no_post()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@user_routes.route('/<int:id>/password', methods=["PUT"])
@login_required
def update_user_password(id):
    """
    Update a users' password
    """
    form = PasswordUpdateForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    user = User.query.get(id)

    if not user:
        return {"errors": "user is not found"}, 404

    if current_user.id != id:
        return {"errors": "you are not authorized to edit the profile of this user"}, 403

    if form.validate_on_submit():
        user.password = form.data["new_password"]
        db.session.commit()
        logout_user()
        return {"message": "Password changed. You are being logged out"}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# @user_routes.route('/<int:id>/follows', methods=["PUT"])
# @login_required
# def update_user_follows(id):
