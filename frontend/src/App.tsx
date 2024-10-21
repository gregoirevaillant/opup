import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./organisms/Layout";
import AdminPage from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";
import JobPage from "./pages/JobPage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Navigate to="/jobs" />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />

				<Route path="jobs">
					<Route index element={<JobsPage />} />
					<Route path=":jobId" element={<JobPage />} />
				</Route>

				<Route path="admin" element={<AdminPage />} />

				<Route path="profile" element={<ProfilePage />} />

				{/* CATCH ERRORS */}
				<Route path="*" element={<ErrorPage />} />
			</Route>
		</Routes>
	);
}

export default App;
