import axiosInstance from "../axiosInstance.ts";

const getJob = async (jobId: string) => {
	const response = await axiosInstance.get(`/jobs/${jobId}`);

	return response.data;
};

export default getJob;
