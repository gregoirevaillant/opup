import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACK_END_URL,
	timeout: 1000
});

axiosInstance.interceptors.request.use(function (config) {
	const token = localStorage.getItem("token");
	config.headers.Authorization = token ? `Bearer ${token}` : "";
	return config;
});

export default axiosInstance;
