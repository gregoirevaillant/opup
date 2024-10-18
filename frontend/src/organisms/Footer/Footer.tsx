import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.company}>
				<Link to="/jobs">
					<img src={logo} alt="logo" />
				</Link>
				<p className={styles.tagline}>
					Towards better
					<br />
					career opportunities
				</p>
			</div>
			<div className={styles.about}>
				<h4>About us</h4>
				<ul className={styles.linksWrapper}>
					<li>
						<a
							className={styles.link}
							href="https://fr.linkedin.com/in/emilie-boutboul-b3b9b419b"
							target="_blank"
							rel="nooperner noreferrer"
							title="View Emilie BOUTBOUL's LinkedIn profile"
						>
							<FontAwesomeIcon icon={faLinkedin} /> Emilie BOUTBOUL
						</a>
					</li>
					<li>
						<a
							className={styles.link}
							href="https://www.linkedin.com/in/gregoirevaillant/"
							target="_blank"
							rel="nooperner noreferrer"
							title="View Grégoire VAILLANT's LinkedIn profile"
						>
							<FontAwesomeIcon icon={faLinkedin} /> Grégoire VAILLANT
						</a>
					</li>
					<li>
						<a
							className={styles.link}
							href="https://github.com/gregoirevaillant/opup"
							target="_blank"
							rel="nooperner noreferrer"
							title="View this project GitHub and information"
						>
							<FontAwesomeIcon icon={faCircleInfo} /> Project information
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
