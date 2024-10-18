import { faGhost, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.svg";

import styles from "./Header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<Link to="/jobs" className={styles.logo}>
				<img src={logo} alt="logo" />
			</Link>

			<nav>
				<ul className={styles.linksWrapper}>
					<li>
						<NavLink
							to="/jobs"
							className={({ isActive }) => (isActive ? styles.active : styles.link)}
						>
							<FontAwesomeIcon icon={faHouse} size="xl" />
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin"
							className={({ isActive }) => (isActive ? styles.active : styles.link)}
						>
							<FontAwesomeIcon icon={faGhost} size="xl" />
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/profile"
							className={({ isActive }) => (isActive ? styles.active : styles.link)}
						>
							<FontAwesomeIcon icon={faUser} size="xl" />
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
