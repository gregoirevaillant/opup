import axiosInstance from "../axiosInstance.ts";

const getCompanies = async () => {
	const response = await axiosInstance.get("/companies");

	return response.data;
};

export default getCompanies;
