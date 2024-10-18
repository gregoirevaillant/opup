import { IRegisterData } from "../../types/IRegisterData.ts";
import axiosInstance from "../axiosInstance.ts";

const register = async (data: IRegisterData) => {
	const response = await axiosInstance.post("/auth/signup", data);

	return response;
};

export default register;
