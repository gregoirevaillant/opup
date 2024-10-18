import { ILoginData } from "../../types/ILoginData.ts";
import axiosInstance from "../axiosInstance.ts";

const login = async (data: ILoginData) => {
	const response = await axiosInstance.post("/auth/signin", data);

	return response;
};

export default login;
