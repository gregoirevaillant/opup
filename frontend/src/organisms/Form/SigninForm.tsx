import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import login from "../../services/auth/login";

import styles from "./Form.module.css";

const SigninForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/jobs");
		}
	}, [navigate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		login(formData)
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
			<h1>Login</h1>
			<div className={styles.inputWrapper}>
				<input type="text" onChange={handleChange} name="email" placeholder="Email" required />
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
				<span>Don't have an account? </span>
				<Link to="/register">Register here</Link>
			</div>
		</form>
	);
};

export default SigninForm;
