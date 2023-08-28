import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const demoUser = (e) => {
    e.preventDefault();
   dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}));
 }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <>
    <div className="login-modal">
      <h1 style={{color: 'white'}}>bumblr</h1>
      <form className='login-modal-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
            className="login-modal-username"
            placeHolder=' Username or Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="login-modal-password"
            placeHolder=' Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='login-modal-button' type="submit">Log In</button>
        <button onClick={demoUser} className="login-modal-demoUser">Demo User</button>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
