import { getPostsThunk, updatePost } from "./post";

//TYPES
const CREATE_NOTE = "POST /api/notes";
const GET_NOTES = "GET /api/notes";
const UPDATE_NOTE = "PUT /api/notes/:notesId";
const DELETE_NOTE = "DELETE /api/notes/:notesId";

//Action Creators
export function createNote(note) {
  return {
    type: CREATE_NOTE,
    note,
  };
}

export function loadNotes(notes) {
  return {
    type: GET_NOTES,
    notes,
  };
}

export function updateNote(note, noteId) {
  return {
    type: UPDATE_NOTE,
    note,
    noteId,
  };
}

export function deleteNote(noteId) {
  return {
    type: DELETE_NOTE,
    noteId,
  };
}

//AC Thunks
export const postNoteThunk = (note) => async (dispatch) => {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
};

export const getNotesThunk = () => async (dispatch) => {
  const response = await fetch("/api/notes");

  if (response.ok) {
    const notes = await response.json();
    dispatch(loadNotes(notes));
  }
};

export const updateNotesThunk = (note, noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "PUT",
    body: JSON.stringify(note),
  });

  if (response.ok) {
    const resNote = await response.json();
    dispatch(updateNote(resNote, noteId));
    return response;
  }
};

export const deleteNoteThunk = (noteId, postId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
  dispatch(deleteNote(noteId));
  //This sends a second request for every comment we delete, we can refactor later for efficiency
  dispatch(getPostsThunk());
  return response;
};

const initialState = {
  notes: {},
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      const newState = { ...state };
      newState.notes[action.note.id] = action.note;
      return newState;
    }
    case GET_NOTES: {
      const notes_array = action.notes.notes;
      let newState = { ...state };
      notes_array.forEach((note) => (newState.notes[note.id] = note));
      return newState;
    }
    case UPDATE_NOTE: {
      const newState = { ...state };
      newState.notes[action.noteId] = action.note.note;
      return newState;
    }
    case DELETE_NOTE: {
      const newState = { ...state };
      delete newState.notes[action.noteId];
      return newState;
    }
    default:
      return state;
  }
};

export default notesReducer;
