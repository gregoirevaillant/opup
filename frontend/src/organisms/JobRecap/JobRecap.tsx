import TagList from "../../molecules/TagList/TagList";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import { TJob } from "../../types/Tjob";

import styles from "./JobRecap.module.css";
import classNames from "classnames";

interface JobRecapProps {
	job: TJob;
	status: string;
	setApplyForm: (value: React.SetStateAction<boolean>) => void;
}

const JobRecap = ({ job, status, setApplyForm }: JobRecapProps) => {
	const { title, company_name, tags } = job;

	const handleOpen = () => {
		document.body.style.overflow = "hidden";
		setApplyForm(true);
	};

	return (
		<div className={styles.card}>
			<StatusTag status={status} />
			<div className={styles.cardHeader}>
				<div className={styles.imageWrapper}>
					<img
						className={styles.image}
						src="https://logo-marque.com/wp-content/uploads/2020/09/IKEA-Logo-1982-2019.png"
						alt="logo.ikea"
					/>
				</div>
				<div>
					<h3 className={styles.title}>{title}</h3>
					<span className={styles.company}>{company_name}</span>
				</div>
			</div>
			<TagList tags={tags} />
			{status === "applied" ? (
				<button
					onClick={handleOpen}
					className={classNames(styles.applyButtton, {
						[styles.info]: true
					})}
				>
					Already applied
				</button>
			) : (
				<button onClick={handleOpen} className={styles.applyButtton}>
					Apply
				</button>
			)}
		</div>
	);
};

export default JobRecap;
