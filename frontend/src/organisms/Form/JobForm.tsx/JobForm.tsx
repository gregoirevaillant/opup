import { faClose, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import getCompanies from "../../../services/companies/getCompanies";
import createJob from "../../../services/jobs/createJob";
import updateJob from "../../../services/jobs/updateJob";
import { TCompany } from "../../../types/Tcompany";
import { TJob } from "../../../types/Tjob";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./JobForm.module.css";

interface JobFormProps {
	job: TJob | null;
	onClose: () => void;
	onJobCreated: (newJob: TJob) => void;
	onJobUpdated: (updatedJob: TJob) => void;
}

const JobForm = ({ job, onClose, onJobCreated, onJobUpdated }: JobFormProps) => {
	const [companies, setCompanies] = useState<TCompany[]>([]);
	const [tagInput, setTagInput] = useState("");
	const [isInitialRender, setIsInitialRender] = useState(true);
	const [description, setDescription] = useState<string>();
	const [desiredProfile, setDesiredProfile] = useState<string>();
	const [formData, setFormData] = useState<TJob>({
		id: "",
		title: "",
		description: "",
		desired_profile: "",
		company_id: "",
		company_name: "",
		tags: []
	});

	useEffect(() => {
		getCompanies().then((companies) => {
			setCompanies(companies);
		});
	}, []);

	useEffect(() => setIsInitialRender(false), []);

	useEffect(() => {
		if (job && !description && !desiredProfile) {
			setDescription(job.description);
			setDesiredProfile(job.desired_profile);
		}

		if (job && !description && !desiredProfile) {
			setFormData({
				id: job.id,
				title: job.title,
				description: job.description,
				company_id: job.company_id,
				desired_profile: job.desired_profile,
				company_name: job.company_name,
				tags: job.tags
			});
		}
	}, [description, desiredProfile, job]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTagInput(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const trimmedTag = tagInput.trim();
			if (trimmedTag) {
				if (!formData.tags.includes(trimmedTag)) {
					setFormData((prevData) => ({
						...prevData,
						tags: [...prevData.tags, trimmedTag]
					}));
					setTagInput("");
				} else {
					toast.error("Tag already added");
					setTagInput("");
				}
			}
		}
	};

	const handleDeleteTag = (tagToDelete: string) => {
		setFormData((prevData) => ({
			...prevData,
			tags: prevData.tags.filter((tag) => tag !== tagToDelete)
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (job) {
			const updatedJob: TJob = await updateJob(job.id, formData);
			toast.success(`${updatedJob.title} updated`);
			onJobUpdated(updatedJob);
		} else {
			const newJob: TJob = await createJob(formData);
			toast.success(`${newJob.title} created`);
			onJobCreated(newJob);
		}

		setDescription("");
		setDesiredProfile("");
		onClose();
	};

	useEffect(() => {}, [description, formData.description]);

	return (
		<div className={styles.formWrapper}>
			<div onClick={onClose} className={styles.closeButton}>
				<FontAwesomeIcon size="xl" icon={faXmark} />
			</div>
			<h3>{job ? "Edit Job" : "Create Job"}</h3>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputWrapper}>
					<input
						type="text"
						name="title"
						onChange={handleChange}
						value={formData.title}
						placeholder="Job Title"
						required
						maxLength={40}
					/>
					<div className={styles.reactQuill}>
						{!isInitialRender && (
							<ReactQuill
								value={description}
								onChange={(value) => {
									setFormData({
										...formData,
										description: value
									});
									setDescription(value);
								}}
								placeholder="Post description"
							/>
						)}
					</div>
					<div className={styles.reactQuill}>
						{!isInitialRender && (
							<ReactQuill
								value={desiredProfile}
								onChange={(value) => {
									setFormData({
										...formData,
										desired_profile: value
									});
									setDesiredProfile(value);
								}}
								placeholder="Desired profile"
							/>
						)}
					</div>
					<select name="company_id" value={formData.company_id} onChange={handleChange} required>
						<option value="">Select Company</option>
						{companies?.map((company) => (
							<option key={company.id} value={company.id}>
								{company.name}
							</option>
						))}
					</select>
					<input
						type="text"
						value={tagInput}
						onChange={handleTagChange}
						onKeyDown={handleKeyDown}
						placeholder="Add a tag and press Enter"
						maxLength={20}
					/>
					<div className={styles.tagsList}>
						{formData.tags.map((tag, index) => (
							<div
								key={JSON.stringify(`${index}-${tag}`)}
								className={styles.tag}
								onClick={() => handleDeleteTag(tag)}
							>
								{tag}
								<FontAwesomeIcon icon={faClose} />
							</div>
						))}
					</div>
				</div>

				<button type="submit">{job ? "Update" : "Create"}</button>
			</form>
		</div>
	);
};

export default JobForm;
