import { TInteraction } from "../../types/TInteraction.ts";
import axiosInstance from "../axiosInstance.ts";

const updateInteraction = async (interactionData: TInteraction) => {
	const response = await axiosInstance.put("/interactions", {
		interactionData
	});

	return response.data;
};

export default updateInteraction;
