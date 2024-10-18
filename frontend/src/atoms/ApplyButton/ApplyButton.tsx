import { useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./ApplyButton.module.css";

interface ApplyButtonProps {
	onApply: () => void;
}

const ApplyButton = ({ onApply }: ApplyButtonProps) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 200) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<button
			className={classNames(styles.scrollButton, {
				[styles.visible]: isVisible,
				[styles.hidden]: !isVisible
			})}
			onClick={onApply}
		>
			Apply
		</button>
	);
};

export default ApplyButton;
