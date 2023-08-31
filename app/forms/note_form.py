from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import Note

class NoteForm(FlaskForm):
    user_id = IntegerField("user id", validators=[DataRequired()])
    post_id = IntegerField("post id", validators=[DataRequired()])
    comment = StringField("comment", validators=[DataRequired(), Length(min=1, max=255)])
