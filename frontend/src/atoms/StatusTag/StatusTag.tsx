import { faEnvelope, faEnvelopeOpen, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAuth from "../../hooks/useAuth";

import styles from "./StatusTag.module.css";

interface StatusTagProps {
	status: string;
}

const StatusTag = ({ status }: StatusTagProps) => {
	const { user } = useAuth();

	const getStatusIcon = () => {
		switch (status) {
			case "nothing":
				return <FontAwesomeIcon size="xl" icon={faEnvelope} />;
			case "seen":
				return <FontAwesomeIcon size="xl" icon={faEnvelopeOpen} />;
			case "applied":
				return <FontAwesomeIcon size="xl" icon={faEnvelopeOpenText} />;
			default:
				return <FontAwesomeIcon size="xl" icon={faEnvelope} />;
		}
	};

	return user ? <div className={styles.status}>{getStatusIcon()}</div> : null;
};

export default StatusTag;
