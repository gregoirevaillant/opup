import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import GhostCard from "../../molecules/GhostCard/GhostCard";
import getJobs from "../../services/jobs/getJobs";
import { TJob } from "../../types/Tjob";
import JobForm from "../Form/JobForm.tsx/JobForm";
import PageNavigation from "../../atoms/PageNavigation/PageNavigation";
import SearchBar from "../../molecules/SearchBar/SearchBar";

import styles from "./GhostCardList.module.css";

const GhostCardList = () => {
	const [jobs, setJobs] = useState<TJob[]>([]);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [currentJob, setCurrentJob] = useState<TJob | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await getJobs(currentPage, searchTerm);
				setJobs(response.currentJobs);
				setTotalPages(response.totalPages);
			} catch (error) {
				console.log("Error: could not get jobs", error);
			}
		};

		fetchJobs();
	}, [currentPage, searchTerm]);

	const handleCreateClick = () => {
		setCurrentJob(null);
		document.body.style.overflow = "hidden";
		setIsFormVisible(true);
	};

	const handleEditJob = (job: TJob) => {
		setCurrentJob(job);
		document.body.style.overflow = "hidden";
		setIsFormVisible(true);
	};

	const handleFormClose = () => {
		setIsFormVisible(false);
		setCurrentJob(null);
		document.body.style.overflow = "unset";
	};

	const handleJobDeleted = (id: string) => {
		setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
	};

	const handleJobCreated = (newJob: TJob) => {
		setJobs((prevJobs) => [...prevJobs, newJob]);
	};

	const handleJobUpdated = (updatedJob: TJob) => {
		setJobs((prevJobs) => prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
	};

	return (
		<>
			<div className={styles.wrapper}>
				<SearchBar setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
				<button className={styles.button} onClick={handleCreateClick}>
					<FontAwesomeIcon icon={faCirclePlus} /> Create
				</button>
				{jobs.length > 0 ? (
					<div className={styles.jobsWrapper}>
						{jobs.map((job) => (
							<GhostCard
								key={job.id}
								job={job}
								onEdit={handleEditJob}
								onDelete={handleJobDeleted}
							/>
						))}
					</div>
				) : (
					<div className={styles.noJobsWrapper}>No jobs available</div>
				)}

				<PageNavigation
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>
			</div>

			{isFormVisible && (
				<div className={styles.formPopup}>
					<JobForm
						job={currentJob}
						onClose={handleFormClose}
						onJobCreated={handleJobCreated}
						onJobUpdated={handleJobUpdated}
					/>
				</div>
			)}
		</>
	);
};

export default GhostCardList;
