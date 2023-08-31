import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePostThunk } from "../../store/post";
import "./DeletePostModal.css"

function DeletePostModal ({ obj }) {
  const dispatch = useDispatch()

  const { closeModal } = useModal()
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePostThunk(obj.id))

    closeModal()
  }

  return (
    <div id="confirm-delete-container">
      <h2>Are you sure you want to delete your post?</h2>
      <div id="confirm-delete-buttons-container">
        <button
        id="no-button"
        onClick={closeModal}
        >Cancel</button>
        <button
        id="yes-button"
        onClick={handleDelete}
        >Ok</button>
      </div>
    </div>
  )
}

export default DeletePostModal;
