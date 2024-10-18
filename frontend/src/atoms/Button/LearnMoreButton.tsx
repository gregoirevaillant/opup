import { useNavigate } from "react-router-dom";

import styles from "./LearnMoreButton.module.css";

interface LearnMoreButtonProps {
	label: string;
	id: string;
}

const LearnMoreButton = ({ label, id }: LearnMoreButtonProps) => {
	const navigate = useNavigate();

	return (
		<button className={styles.button} onClick={() => navigate(`/jobs/${id}`)}>
			{label}
		</button>
	);
};

export default LearnMoreButton;
