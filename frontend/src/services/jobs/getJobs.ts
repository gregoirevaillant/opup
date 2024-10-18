import axiosInstance from "../axiosInstance.ts";

const getJobs = async (currentPage: number, searchTerm: string) => {
	const response = await axiosInstance.get("/jobs", {
		params: {
			pageIndex: currentPage - 1,
			search: searchTerm || null
		}
	});

	return response.data;
};

export default getJobs;
