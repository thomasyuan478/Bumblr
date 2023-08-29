from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Note
from app import db

notes_routes = Blueprint('notes', __name__)

@notes_routes.route("")
def index():
  notes = Note.query.all()
  return {'notes' : [note.to_dict() for note in notes]}

@notes_routes.route("/<int:id>", methods=["DELETE"])
def delete_note(id):
  note = Note.query.get(id)
  db.session.delete(note)
  db.session.commit()
  return {"message": "Comment deleted"}
