import axiosInstance from "../axiosInstance.ts";

const delteJob = async (jobId: string) => {
	const response = await axiosInstance.delete(`/jobs/${jobId}`);

	return response.data;
};

export default delteJob;
