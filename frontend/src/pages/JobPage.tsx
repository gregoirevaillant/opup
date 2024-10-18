import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ApplyButton from "../atoms/ApplyButton/ApplyButton";
import BackButton from "../atoms/BackButton/BackButton";
import useAuth from "../hooks/useAuth";
import ApplicationForm from "../organisms/Form/ApplicationForm/ApplicationForm";
import JobRecap from "../organisms/JobRecap/JobRecap";
import getInteractions from "../services/interactions/getInteractions";
import updateInteraction from "../services/interactions/updateInteraction";
import getJob from "../services/jobs/getJob";
import { TJob } from "../types/Tjob";

import styles from "./JobPage.module.css";

const JobPage = () => {
	const { user } = useAuth();
	const { jobId } = useParams();
	const [job, setJob] = useState<TJob>();
	const [status, setStatus] = useState("");
	const [applyForm, setApplyForm] = useState(false);

	useEffect(() => {
		if (job && user) {
			getInteractions(user.id, job.id).then((res) => {
				setStatus(res.status);
			});
		}
	}, [job, user]);

	useEffect(() => {
		if (job && user && status === undefined) {
			setStatus("seen");
			updateInteraction({
				status: "seen",
				job_id: job?.id,
				user_id: user.id
			});
		}
	}, [job, status, user]);

	useEffect(() => {
		if (jobId) {
			getJob(jobId)
				.then((fetchedJob: TJob) => {
					setJob(fetchedJob);
				})
				.catch((error: Error) => {
					console.log("Error: could not getItems", error);
				});
		}
	}, [jobId]);

	const handleOpen = () => {
		document.body.style.overflow = "hidden";
		setApplyForm(true);
	};

	return (
		<div className={styles.jobPageWrapper}>
			{applyForm && <ApplicationForm setStatus={setStatus} setApplyForm={setApplyForm} />}
			<BackButton />
			{job && (
				<>
					<JobRecap job={job} status={status} setApplyForm={setApplyForm} />
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>Post description</h3>
						<div className="htmlWrapperBig" dangerouslySetInnerHTML={{ __html: job.description }} />
					</div>
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>Desired profile</h3>
						<div
							className="htmlWrapperBig"
							dangerouslySetInnerHTML={{ __html: job.desired_profile }}
						/>
					</div>
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>Company information</h3>
						<p>{job?.company_description}</p>
					</div>
				</>
			)}
			{status !== "applied" && <ApplyButton onApply={handleOpen} />}
		</div>
	);
};

export default JobPage;
