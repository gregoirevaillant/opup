import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
	admin?: string;
}

const verifyAdmin = () => {
	return (req: CustomRequest, res: Response, next: NextFunction): void => {
		if (!req?.admin) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		next();
	};
};

export default verifyAdmin;
