import Tag from "../../atoms/Tag/Tag";

import styles from "./TagList.module.css";

interface TagListProps {
	tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
	return (
		tags && (
			<div className={styles.listWrapper}>
				{tags.map((tag, index) => (
					<Tag key={index} label={tag} />
				))}
			</div>
		)
	);
};

export default TagList;
