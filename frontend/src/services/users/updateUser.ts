import { TUser } from "../../types/TUser.ts";
import axiosInstance from "../axiosInstance.ts";

const updateUser = async (userId: string, updatedUser: TUser) => {
	const response = await axiosInstance.put(`/users/${userId}`, updatedUser);

	return response.data;
};

export default updateUser;
