import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

const demoUser = async (e) => {
  e.preventDefault();
  let email = 'Demo@aa.io'
  let password = 'password'
  const data = await dispatch(login(email, password));
  if (data) {
    setErrors(data);
  } else {
      closeModal()
  }
};


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
    <div style={{backgroundColor: 'rgb(76, 76, 76)'}}>
    <div className="login-modal">
    <img className="login-modal-gif" src="https://assets.tumblr.com/pop/src/assets/images/login-wall/art_v2-3f0f7a0b.gif" alt="" />
      <h1 style={{color: 'white', fontSize: '43px', fontFamily: 'trebuchet ms'}}>bumblr</h1>
      <p style={{color: 'white'}}>Welcome to your corner of the internet. You'll never be bored again.</p>
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
        <p onClick={demoUser} className="login-modal-demoUser">Demo User</p>
      </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
