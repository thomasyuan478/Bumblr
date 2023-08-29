from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post
from html.parser import HTMLParser

class Parser(HTMLParser):
  def __init__(self):
    super().__init__()
    self.tags = []
    self.content = ""

  def handle_starttag(self, tag, attrs):
    self.tags.append(tag)

  def handle_data(self, data):
    self.content += data


def not_empty(form, field):
  # Check if the content is empty
  content = field.data
  parser = Parser()
  parser.feed(content)
  valid_tags = ["img", "a", "iframe"]
  if not any(tag in valid_tags for tag in parser.tags) and (all(char == u'\xa0' or char == " " for char in parser.content) or not parser.content):
    raise ValidationError('Content must not be empty')



class PostForm(FlaskForm):
  user_id = IntegerField("user id", validators=[DataRequired()])
  content = StringField("content", validators=[DataRequired(), not_empty])
  tags = StringField("tags")
  created_at = DateTimeField("created at", format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])
