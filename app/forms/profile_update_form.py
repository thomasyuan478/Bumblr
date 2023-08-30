from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Optional, URL
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != current_user.id:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != current_user.id:
        raise ValidationError('Username is already in use.')


class ProfileUpdateForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=6, max=40), username_exists])
    nickname = StringField("nickname", validators=[Optional(), Length(max=40)])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    bio = StringField("bio", validators=[Optional(), Length(max=255)])
    banner_pic = StringField("banner pic", validators=[DataRequired(), URL()])
    profile_pic = StringField("profile pic", validators=[DataRequired(), URL()])
