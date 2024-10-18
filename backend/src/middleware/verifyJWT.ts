import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
	email: string;
	admin: boolean;
}

interface CustomRequest extends Request {
	email?: string;
	admin?: boolean;
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
	const authHeader =
		(req.headers.authorization as string) || (req.headers.Authorization as string);

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const token = authHeader.split(" ")[1];

	if (!token) {
		res.status(401).json({ error: "Access denied" });
		return;
	}

	jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
		if (err) {
			res.status(403).json({ message: "Forbidden" });
			return;
		}

		const decodedToken = decoded as DecodedToken;

		req.email = decodedToken.email;
		req.admin = decodedToken.admin;

		next();
	});
};

export default verifyJWT;
