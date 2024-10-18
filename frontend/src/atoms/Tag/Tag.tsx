import styles from "./Tag.module.css";

interface TagProps {
	label: string;
}

const Tag = ({ label }: TagProps) => {
	return <span className={styles.tag}>{label}</span>;
};

export default Tag;
