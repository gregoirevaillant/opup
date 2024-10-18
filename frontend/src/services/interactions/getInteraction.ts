import axiosInstance from "../axiosInstance.ts";

const getInteraction = async (userId: string, jobId: string) => {
	const response = await axiosInstance.get("/interactions", {
		params: { user_id: userId, job_id: jobId }
	});

	return response.data;
};

export default getInteraction;
