import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import updateUser from "../../services/users/updateUser";
import { TUser } from "../../types/TUser";

import styles from "./ProfileCard.module.css";

interface ProfileCardProps {
	user: TUser;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		toast.success("You are disconnected!");
		navigate("/jobs");
	};

	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({
		firstname: user?.firstname ?? "",
		lastname: user?.lastname ?? "",
		email: user?.email ?? "",
		admin: user?.admin ?? false,
		id: user?.id ?? ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleEdit = () => {
		setEditMode(true);
	};

	const handleConfirm = () => {
		if (user && formData) {
			updateUser(user.id, formData).then((response) => {
				localStorage.setItem("token", response.token);
				toast.success("Profile updated");
				navigate("/profile");
				setEditMode(false);
			});
		}
	};

	const handleCancel = () => {
		setEditMode(false);
		setFormData({
			firstname: user?.firstname ?? "",
			lastname: user?.lastname ?? "",
			email: user?.email ?? "",
			admin: user?.admin ?? false,
			id: user?.id ?? ""
		});
	};

	return (
		<div className={styles.profileWrapper}>
			{editMode ? (
				<>
					<div className={styles.inputWrapper}>
						<h5>ID </h5>
						<input type="text" name="id" placeholder="ID" value={formData.id} readOnly />
					</div>
					<div className={styles.inputWrapper}>
						<h5>First name </h5>
						<input
							type="text"
							onChange={handleChange}
							name="firstname"
							placeholder="First name"
							value={formData.firstname}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<h5>Last name </h5>
						<input
							type="text"
							onChange={handleChange}
							name="lastname"
							placeholder="Last name"
							value={formData.lastname}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<h5>Email </h5>
						<input
							type="email"
							onChange={handleChange}
							name="email"
							placeholder="Email"
							value={formData.email}
						/>
					</div>
					<div className={styles.editButtons}>
						<button className={styles.editButton} onClick={handleConfirm}>
							Ok
						</button>
						<button className={styles.editButton} onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</>
			) : (
				<>
					<div className={styles.information}>
						<h5>ID</h5>
						<p>{user?.id}</p>
					</div>

					<div className={styles.information}>
						<h5>First name</h5>
						<p>{user?.firstname}</p>
					</div>
					<div className={styles.information}>
						<h5>Last name</h5>
						<p>{user?.lastname}</p>
					</div>

					<div className={styles.information}>
						<h5>Email</h5>
						<p>{user?.email}</p>
					</div>

					<button onClick={handleEdit} className={styles.editButton}>
						<FontAwesomeIcon icon={faPen} />
						Edit Profile
					</button>
					<button onClick={handleLogout} className={styles.logoutButton}>
						Log out
					</button>
				</>
			)}
		</div>
	);
};

export default ProfileCard;
