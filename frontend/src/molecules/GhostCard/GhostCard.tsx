import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import delteJob from "../../services/jobs/deleteJob";
import { TJob } from "../../types/Tjob";

import styles from "./GhostCard.module.css";
import { toast } from "react-toastify";

interface GhostCardProps {
	job: TJob;
	onEdit: (job: TJob) => void;
	onDelete: (id: string) => void;
}

const stripHtml = (html: string) => {
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = html;
	const text = tempDiv.textContent || tempDiv.innerText || " ";
	return text;
};

const GhostCard = ({ job, onEdit, onDelete }: GhostCardProps) => {
	const { id, title, description, company_name, company_logo } = job;
	const [isPopupVisible, setIsPopupVisible] = useState(false);

	const cleanDesc =
		stripHtml(description).length > 270
			? stripHtml(description).substring(0, 270) + "..."
			: stripHtml(description);

	const handleEditDeleteClick = () => {
		setIsPopupVisible(true);
	};

	const handleConfirm = (action: "edit" | "delete") => {
		setIsPopupVisible(false);
		if (action === "edit") {
			onEdit(job);
		} else if (action === "delete") {
			delteJob(id).then((res) => {
				onDelete(id);
				toast.info(`${res.title} deleted`);
			});
		}
	};

	const handleCancel = () => {
		setIsPopupVisible(false);
	};

	return (
		<div className={styles.ghostCard}>
			<div className={styles.right}>
				<div className={styles.imageWrapper}>
					<img
						className={styles.image}
						src={company_logo}
						alt="logo.ikea"
					/>
				</div>

				<div className={styles.information}>
					<h3 className={styles.title}>{title}</h3>
					<span className={styles.company}>{company_name}</span>
					<p className={styles.description}>{cleanDesc}</p>
				</div>
			</div>

			<div className={styles.edit} onClick={handleEditDeleteClick}>
				<FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
			</div>

			{isPopupVisible && (
				<div className={styles.popup}>
					<p>Do you want to edit or delete this job?</p>
					<div className={styles.buttonWrapper}>
						<button onClick={() => handleConfirm("edit")}>Edit</button>
						<button onClick={() => handleConfirm("delete")}>Delete</button>
						<button onClick={handleCancel}>Cancel</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default GhostCard;
