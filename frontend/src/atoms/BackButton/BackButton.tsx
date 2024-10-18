import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import styles from "./BackButton.module.css";

const BackButton = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.button}>
			<Link
				to="."
				onClick={(e) => {
					e.preventDefault();
					navigate(-1);
				}}
			>
				<FontAwesomeIcon icon={faCircleChevronLeft} size="xl" />
				<span className={styles.link}>Back</span>
			</Link>
		</div>
	);
};

export default BackButton;
