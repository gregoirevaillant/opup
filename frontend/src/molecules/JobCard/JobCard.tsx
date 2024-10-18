import LearnMoreButton from "../../atoms/Button/LearnMoreButton";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import { TJob } from "../../types/Tjob";
import TagList from "../TagList/TagList";

import styles from "./JobCard.module.css";

interface JobProps {
	job: TJob;
	status: string;
}

const stripHtml = (html: string) => {
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = html;
	const text = tempDiv.textContent || tempDiv.innerText || " ";
	return text;
};

const JobCard = ({ job, status }: JobProps) => {
	const { title, description, company_name, id, tags } = job;

	const cleanDesc =
		stripHtml(description).length > 270
			? stripHtml(description).substring(0, 270) + "..."
			: stripHtml(description);

	return (
		<div className={styles.card}>
			<div className={styles.top}>
				<StatusTag status={status} />
				<div className={styles.cardHeader}>
					<div className={styles.imageWrapper}>
						<img
							className={styles.image}
							src="https://logo-marque.com/wp-content/uploads/2020/09/IKEA-Logo-1982-2019.png"
							alt="logo.ikea"
						/>
					</div>
					<div className={styles.information}>
						<h3 className={styles.title}>{title}</h3>
						<span className={styles.company}>{company_name}</span>
					</div>
				</div>
				<TagList tags={tags} />
				<p className={styles.description}>{cleanDesc}</p>
			</div>

			<div>
				<LearnMoreButton label="Learn more..." id={id} />
			</div>
		</div>
	);
};

export default JobCard;
