import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import validator from "validator";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorsArray = [];
    if (password !== confirmPassword) {
      errorsArray.push(['Confirm Password field must be the same as the Password field']);
    }
    if (!validator.isEmail(email)) {
      errorsArray.push('Invalid email')
    }
    if(!errorsArray.length) {
        await dispatch(
          signUp(
          username,
          email,
          password,
        )
      )
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    } else {
      setErrors(errorsArray)
    }
    }

  return (
    <>
    <div className="signup-entire-page">
    <div className="signup-page">
      <h1 className="signup-page-title">Bumblr</h1>
      <form className='signup-page-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            className="signup-page-email"
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="signup-page-username"
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="signup-page-password"
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="signup-page-confirm-password"
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className='signup-page-button' type="submit">Sign Up</button>
      </form>
      </div>
      </div>
    </>
  );
  }

export default SignupFormPage;
