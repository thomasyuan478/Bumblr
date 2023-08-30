from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Optional, URL
from app.models import User

def password_matches(form, field):
    # Checking if current password matches
    password = field.data
    user = User.query.get(current_user.id)
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')

def password_same(form, field):
  # Checking if new password is the same as current password
  new_password = field.data
  current_password = form.data["current_password"]
  if current_password == new_password:
      raise ValidationError('New password must not be the same as current password')

class PasswordUpdateForm(FlaskForm):
  current_password = StringField('current password', validators=[DataRequired(), Length(min=6, max=20), password_matches])
  new_password = StringField('new password', validators=[DataRequired(), Length(min=6, max=20), password_same])
