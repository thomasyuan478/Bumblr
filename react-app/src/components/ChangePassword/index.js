import { useState, useRef, useEffect } from "react";
import "./ChangePassword.css"
import { useNonClosingModal } from "../../context/NonClosingModal";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/session";
import { useHistory } from "react-router-dom";

export function ChangePassword({ user, setChangePassword }) {
  const [onchangeCurrPassword, setOnchangeCurrPassword] = useState("")
  const [currPassword, setCurrPassword] = useState("")
  const [currPasswordEdited, setCurrPasswordEdited] = useState(false)
  const [onchangeNewPassword, setOnchangeNewPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordEdited, setNewPasswordEdited] = useState(false)
  const [onchangeConfirmPassword, setOnchangeConfirmPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordEdited, setConfirmPasswordEdited] = useState(false)
  const { closeModal } = useNonClosingModal()
  const dispatch = useDispatch()
  const [validationErrors, setValidationErrors] = useState({})
  const [serverErrors, setServerErrors] = useState([])
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = {
      current_password: currPassword,
      new_password: newPassword
    }
    const data = await dispatch(changePassword(user.id, password))
    if (data) {
      setServerErrors(data)
      return
    } else {
      history.replace("/")
      closeModal()
      return
    }
  }

  useEffect(() => {
    const errors = { currPassword: [], newPassword: [], confirmPassword: [] }

    if (currPasswordEdited) {
      if (currPassword.length < 6 || currPassword.length > 20) {
        errors.currPassword.push("Password must be at least 6 characters long and no longer than 20 characters")
      }
    }

    if (newPasswordEdited) {
      if (newPassword.length < 6 || newPassword.length > 20) {
        errors.newPassword.push("Password must be at least 6 characters long and no longer than 20 characters")
      }
    }
    if (confirmPasswordEdited) {
      if (confirmPassword.length < 6 || confirmPassword.length > 20) {
        errors.confirmPassword.push("Password must be at least 6 characters long and no longer than 20 characters")
      }
      if (newPassword && confirmPassword !== newPassword) {
        errors.confirmPassword.push("Confirm password must match new password")
      }
    }

    setValidationErrors(errors)
  }, [currPassword, newPassword, confirmPassword])

  return (
    <>
      <div className="change-password_container">
        <div>
          <span><b>Current Password</b></span>
          <input
            type="password"
            value={onchangeCurrPassword}
            onChange={(e) => setOnchangeCurrPassword(e.target.value)}
            onBlur={(e) => {
              setCurrPasswordEdited(true)
              setCurrPassword(e.target.value)
            }}
          />
        </div>
        <div className="change-password_validation-error">
          {validationErrors.currPassword && validationErrors.currPassword.map((error, i) => {
            return (
              <span key={i}><i className="fa-solid fa-triangle-exclamation" /> {error}</span>
            )
          })}
        </div>
        <div>
          <span><b>New Password</b></span>
          <input
            type="password"
            value={onchangeNewPassword}
            onChange={(e) => setOnchangeNewPassword(e.target.value)}
            onBlur={(e) => {
              setNewPasswordEdited(true)
              setNewPassword(e.target.value)
            }}
          />
        </div>
        <div className="change-password_validation-error">
          {validationErrors.newPassword && validationErrors.newPassword.map((error, i) => {
            return (
              <span key={i}><i className="fa-solid fa-triangle-exclamation" /> {error}</span>
            )
          })}
        </div>
        <div>
          <span><b>Confirm New Password</b></span>
          <input
            type="password"
            value={onchangeConfirmPassword}
            onChange={(e) => setOnchangeConfirmPassword(e.target.value)}
            onBlur={(e) => {
              setConfirmPasswordEdited(true)
              setConfirmPassword(e.target.value)
            }}
          />
        </div>
        <div className="change-password_validation-error">
          {validationErrors.confirmPassword && validationErrors.confirmPassword.map((error, i) => {
            return (
              <span key={i}><i className="fa-solid fa-triangle-exclamation" /> {error}</span>
            )
          })}
        </div>
        <div className={`change-password_server-error ${serverErrors.length ? "show" : "hide"}`}>
          {serverErrors.map((error, i) => {
            return (
              <span key={i}><i className="fa-solid fa-triangle-exclamation" /> {error}</span>
            )
          })}
        </div>
        <div className="change-password_buttons">
          <button
            onClick={handleSubmit}
            disabled={!currPasswordEdited || !newPasswordEdited || !confirmPasswordEdited || Object.values(validationErrors).flat().length}
          >
            Submit
          </button>
          <button
            onClick={() => {
              closeModal()
              setChangePassword(false)
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}
