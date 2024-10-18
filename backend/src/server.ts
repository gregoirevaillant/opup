import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";

// Creating an instance of an Express app
const app = express();

dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Setting up route handlers for API endpoints
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/companies", require("./routes/companyRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));
app.use("/interactions", require("./routes/interactionRoutes"));

// Catch-all route for handling 404 errors
app.all("*", (req: Request, res: Response) => {
	res.status(404).json({ message: "The following route does not exist!" });
});

// Starting the server
app.listen(process.env.PORT, () => {
	console.log("process.env.NODE_ENV", process.env.NODE_ENV);
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
