import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import updateInteraction from "../../../services/interactions/updateInteraction";

import styles from "./ApplicationForm.module.css";
import { toast } from "react-toastify";

interface ApplicationFormProps {
	setApplyForm: (value: React.SetStateAction<boolean>) => void;
	setStatus: (value: React.SetStateAction<string>) => void;
}

const ApplicationForm = ({ setApplyForm, setStatus }: ApplicationFormProps) => {
	const { user } = useAuth();
	const { jobId } = useParams();
	const [formData, setFormData] = useState({
		firstname: user?.firstname ?? "",
		lastname: user?.lastname ?? "",
		email: user?.email ?? "",
		message: ""
	});

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setApplyForm(false);
		document.body.style.overflow = "unset";
		toast.success(`Your application has been sent`);
		if (user && jobId) {
			setStatus("applied");
			updateInteraction({
				status: "applied",
				job_id: jobId,
				user_id: user.id
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleClose = () => {
		setApplyForm(false);
		document.body.style.overflow = "unset";
	};

	return (
		<div className={styles.popUpWrapper}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div onClick={handleClose} className={styles.closeButton}>
					<FontAwesomeIcon size="xl" icon={faXmark} />
				</div>
				<h3>Please fill in the information:</h3>
				<input
					required
					type="text"
					onChange={handleChange}
					name="firstname"
					placeholder="First name"
					value={formData.firstname}
				/>
				<input
					required
					type="text"
					onChange={handleChange}
					name="lastname"
					placeholder="Last name"
					value={formData.lastname}
				/>
				<input
					required
					type="email"
					onChange={handleChange}
					name="email"
					placeholder="Email"
					value={formData.email}
				/>
				<textarea onChange={handleChange} name="message" placeholder="Message" rows={4} />
				<input className={styles.applyBut} type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default ApplicationForm;
