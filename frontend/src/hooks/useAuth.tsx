import { jwtDecode } from "jwt-decode";
import { TUser } from "../types/TUser";

interface JwtPayload {
	id: string;
	email: string;
	admin: boolean;
	firstname: string;
	lastname: string;
}

const useAuth = () => {
	const token = localStorage.getItem("token");
	let user: TUser = null;

	if (token) {
		try {
			const decoded: JwtPayload = jwtDecode(token);

			user = {
				id: decoded.id,
				email: decoded.email,
				admin: decoded.admin,
				firstname: decoded.firstname,
				lastname: decoded.lastname
			};

			return { user };
		} catch (err) {
			console.log("Failed to decode token: ", err);
			localStorage.removeItem("token");
		}
	}

	return { user };
};

export default useAuth;
