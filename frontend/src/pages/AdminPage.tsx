import useAuth from "../hooks/useAuth";
import GhostInformation from "../molecules/GhostInformation/GhostInformation";
import GhostCardList from "../organisms/GhostCardList/GhostCardList";

const AdminPage = () => {
	const { user } = useAuth();

	if (!user) {
		return (
			<>
				<GhostInformation
					text="You must be logged in to access this page"
					navigationLabel="Go to log in"
					navigation="login"
				/>
			</>
		);
	}

	if (user.admin) {
		return <GhostCardList />;
	}

	return (
		<>
			<GhostInformation
				text="You do not have access to this page, you are not an admin"
				navigationLabel="Go to jobs"
				navigation="jobs"
			/>
		</>
	);
};

export default AdminPage;
