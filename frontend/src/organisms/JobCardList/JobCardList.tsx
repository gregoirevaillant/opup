import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import JobCard from "../../molecules/JobCard/JobCard";
import getInteractions from "../../services/interactions/getInteractions";
import getJobs from "../../services/jobs/getJobs";
import { TInteraction } from "../../types/TInteraction";
import { TJob } from "../../types/Tjob";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import PageNavigation from "../../atoms/PageNavigation/PageNavigation";

import styles from "./JobCardList.module.css";

const JobCardList = () => {
	const [jobs, setJobs] = useState<TJob[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [interactions, setInteractions] = useState<TInteraction[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const { user } = useAuth();

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

	useEffect(() => {
		if (user?.id) {
			getInteractions(user.id)
				.then((fetchedInteratcions) => {
					setInteractions(fetchedInteratcions);
				})
				.catch((error) => {
					toast.error(`${error.status} - ${error.response.data.message}`);
				});
		}
	}, [user?.id]);

	const interactionMap = interactions.reduce<Record<string, string>>((acc, interaction) => {
		acc[interaction.job_id] = interaction.status;
		return acc;
	}, {});

	return (
		<div className={styles.wrapper}>
			{user && <h1>Welcome back, {user?.firstname}!</h1>}
			<SearchBar setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
			{jobs.length > 0 ? (
				<div className={styles.jobsWrapper}>
					{jobs.map((job) => (
						<JobCard key={job.id} job={job} status={interactionMap[job.id]} />
					))}
				</div>
			) : (
				<div className={styles.noJobsWrapper}>No jobs available</div>
			)}
			<PageNavigation
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default JobCardList;
