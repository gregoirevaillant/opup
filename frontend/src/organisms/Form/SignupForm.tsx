import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import register from "../../services/auth/register";

import styles from "./Form.module.css";

const SignupForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		fistname: "",
		lastname: "",
		email: "",
		password: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		register(formData)
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				toast.success("You are logged in");
				navigate("/jobs");
			})
			.catch((error) => {
				toast.error(`${error.status} - ${error.response.data.message}`);
			});
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h1>Register</h1>
			<div className={styles.inputWrapper}>
				<input
					type="text"
					onChange={handleChange}
					name="firstname"
					placeholder="First name"
					required
				/>
				<input
					type="text"
					onChange={handleChange}
					name="lastname"
					placeholder="Last name"
					required
				/>
				<input type="email" onChange={handleChange} name="email" placeholder="Email" required />
				<input
					type="password"
					onChange={handleChange}
					name="password"
					placeholder="Password"
					required
				/>
				<input type="submit" value="Submit" />
			</div>
			<div className={styles.footerWrapper}>
				<span>Already have an account? </span>
				<Link to="/login">Login here</Link>
			</div>
		</form>
	);
};

export default SignupForm;
