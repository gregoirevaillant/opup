import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft, faHandPointRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./PageNavigation.module.css";

interface PageNavigationProps {
	setCurrentPage: (value: React.SetStateAction<number>) => void;
	currentPage: number;
	totalPages: number;
}

const PageNavigation = ({ currentPage, setCurrentPage, totalPages }: PageNavigationProps) => {
	const handleDecrement = () => {
		if (currentPage !== 1 && currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleIncrement = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className={styles.numberPage}>
			<button onClick={handleDecrement} disabled={currentPage === 1}>
				<FontAwesomeIcon icon={faHandPointLeft} size="2xl" />
			</button>
			<div className={styles.pageNumberWrapper}>
				<h2>{currentPage}</h2>
			</div>
			<button onClick={handleIncrement} disabled={currentPage === totalPages}>
				<FontAwesomeIcon icon={faHandPointRight} size="2xl" />
			</button>
		</div>
	);
};

export default PageNavigation;
