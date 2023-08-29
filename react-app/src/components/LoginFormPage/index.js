import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div id="whole-login-page">
      <div id="loginpage-container">
        <h1 id="logo-login-page">bumblr</h1>
        <form onSubmit={handleSubmit} id="login-container">
          <ul className="errors-list">
            {errors.map((error, idx) => (
              <li className="errors" key={idx}>{error}</li>
            ))}
          </ul>
          <label className="login-page-labels">
            <input
              id="login-page-email-input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="login-page-labels">
            <input
              id="login-page-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
          <button id="login-page-button" type="submit">Log In</button>
          <div id="login-signup">
            <span>New to Bumblr? <a href="/signup">Sign up!</a></span>
          </div>
          <div id="login-terms">
            <p>
              If you don't have an account for Bumblr, but still want to see our site, click the "Log In" button on the top right and click "Demo User". Have fun!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
