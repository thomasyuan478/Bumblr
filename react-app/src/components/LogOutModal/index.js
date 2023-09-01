import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useNonClosingModal } from "../../context/NonClosingModal";
import "./LogOutModal.css"

function LogOutModal() {
  const dispatch = useDispatch()
  const { closeModal } = useNonClosingModal()

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    // setIsOpen(!isOpen);
    closeModal()
  }

  return (
    <div id="logout-confirm-container">
      <h2>Are you sure you want to logout?</h2>
      <div>
        <div id="confirm-logout-buttons-container">
          <button
            id="no-button"
            onClick={closeModal}
          >Cancel</button>
          <button
            id="yes-button"
            onClick={handleLogOut}
          >Logout</button>
        </div>
      </div>
    </div>
  )
}

export default LogOutModal;
