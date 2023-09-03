import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteNoteThunk } from "../../store/note";
import "./DeleteNoteModal.css";

function DeleteNoteModal({ obj }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteNoteThunk(obj.id));

    closeModal();
  };

  return (
    <div id="confirm-delete-container">
      <h2>Are you sure you want to delete your note?</h2>
      <div id="confirm-delete-buttons-container">
        <button id="no-button" onClick={closeModal}>
          Cancel
        </button>
        <button id="yes-button" onClick={handleDelete}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DeleteNoteModal;
