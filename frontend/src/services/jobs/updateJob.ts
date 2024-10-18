import { TJob } from "../../types/Tjob.ts";
import axiosInstance from "../axiosInstance.ts";

const updateJob = async (jobId: string, updatedJob: TJob) => {
	const response = await axiosInstance.put(`/jobs/${jobId}`, updatedJob);

	return response.data;
};

export default updateJob;
