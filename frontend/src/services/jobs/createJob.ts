import { TJob } from "../../types/Tjob.ts";
import axiosInstance from "../axiosInstance.ts";

const createJob = async (job: TJob) => {
	const response = await axiosInstance.post("/jobs", job);

	return response.data;
};

export default createJob;
