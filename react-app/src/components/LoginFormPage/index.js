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
    <>
      <section id="loginpage-container">
        <h1 id="logo-login-page">bumblr</h1>
        <form onSubmit={handleSubmit} id="login-container">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
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
          <div id="login-terms">
            <p>
              By clicking log in, or continuing with the other options below, you agree to Bumblr’s
              <br></br>
              Terms of Service and have read the Privacy Policy
            </p>
          </div>
          <button id="login-page-button" type="submit">Log In</button>
          <div id="login-signup">
            <span>New to Bumblr? <a href="/signup">Sign up!</a></span>
          </div>
        </form>
      </section>
    </>
  );
}

export default LoginFormPage;
