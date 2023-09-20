from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Post, Note
from app import db
from app.forms import NoteForm

notes_routes = Blueprint('notes', __name__)

@notes_routes.route("")
def index():
  notes = Note.query.all()
  return {'notes' : [note.to_dict() for note in notes]}

@notes_routes.route("/<int:id>", methods=["PUT"])
def update_notes(id):
  form = NoteForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  note = Note.query.get(id)

  if form.validate_on_submit():
    note.comment = form.data["comment"]
    post = Post.query.get(note.post_id)
    db.session.commit()
    return {"post": post.post_to_dict_notes()}
  else:
    return {"errors": form.errors}

@notes_routes.route("/<int:id>", methods=["DELETE"])
def delete_note(id):
  note = Note.query.get(id)
  post = Post.query.get(note.post_id)
  db.session.delete(note)
  db.session.commit()
  return {"post": post.post_to_dict_notes()}
