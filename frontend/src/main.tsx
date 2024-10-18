import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				rtl={false}
				pauseOnHover
			/>
		</BrowserRouter>
	</StrictMode>
);
