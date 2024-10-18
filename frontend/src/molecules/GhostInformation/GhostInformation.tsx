import { useNavigate } from "react-router-dom";

import styles from "./GhostInformation.module.css";

interface GhostInformation {
	text: string;
	navigation: string;
	navigationLabel: string;
}

const GhostInformation = ({ text, navigation, navigationLabel }: GhostInformation) => {
	const navigate = useNavigate();

	return (
		<div className={styles.wrapper}>
			<p>{text}</p>
			<button
				onClick={() => {
					navigate(`/${navigation}`);
				}}
			>
				{navigationLabel}
			</button>
		</div>
	);
};

export default GhostInformation;
