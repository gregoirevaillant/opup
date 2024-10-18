import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import ProfileCard from "../molecules/ProfileCard/ProfileCard";

const ProfilePage = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [navigate, user]);

	return (
		<div>
			<h1>Profile</h1>
			<ProfileCard user={user} />
		</div>
	);
};

export default ProfilePage;
