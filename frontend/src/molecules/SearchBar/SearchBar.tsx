import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./SearchBar.module.css";

interface SearchBarJobs {
	setSearchTerm: (value: React.SetStateAction<string>) => void;
	setCurrentPage: (value: React.SetStateAction<number>) => void;
}

const SearchBar = ({ setSearchTerm, setCurrentPage }: SearchBarJobs) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};

	return (
		<div className={styles.wrap}>
			<div className={styles.search}>
				<input type="text" className={styles.searchTerm} id="input_text" onChange={handleChange} />
				<button type="submit" className={styles.searchButton}>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
