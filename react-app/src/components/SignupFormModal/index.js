import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div style={{backgroundColor: 'rgb(76, 76, 76)'}}>
		<div className="signup-modal">
		<img className="signup-modal-gif" src="https://assets.tumblr.com/pop/src/assets/images/login-wall/art_v2-3f0f7a0b.gif" alt="" />
		<h1 style={{color: 'white', fontSize: '43px', fontFamily: 'trebuchet ms'}}>bumblr</h1>
		<p style={{color: 'white', margin: "0px"}}>Welcome to your corner of the internet. You'll never be bored again.</p>
			<form className='signup-modal-form' onSubmit={handleSubmit}>
				<ul className="errors-list">
					{errors.map((error, idx) => (
						<li className="errors" key={idx}>{error}</li>
					))}
				</ul>
				<label className="signup-modal-labels">
					<input
						className="signup-modal-username"
						placeHolder=' Email'
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="signup-modal-labels">
					<input
						className="signup-modal-username"
						placeHolder=' Username'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="signup-modal-labels">
					<input
						className="signup-modal-password"
						placeHolder=' Password'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="signup-modal-labels">
					<input
						className="signup-modal-confirm-password"
						placeHolder=' Confirm Password'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit" className="signup-modal-button">Sign Up</button>
			</form>
			</div>
		</div>
	);
}

export default SignupFormModal;
