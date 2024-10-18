import bcrypt from "bcrypt";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { v4 as uuidv4 } from "uuid";
import pool from "../config/db";
import { User } from "../types/User";

// @desc Sign up
// @route POST /auth/signup
// @access public
const signUp = expressAsyncHandler(async (req: Request, res: Response) => {
	const { firstname, lastname, email, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);
	const id = uuidv4();

	if (!email || !password || !firstname || !lastname) {
		res.status(400).json({ message: "All fields are required to create an account" });
		return;
	}

	const userDuplicate = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

	if (userDuplicate.rowCount) {
		res.status(409).json({ message: "Email already used" });
		return;
	}

	await pool.query(
		"INSERT INTO users (id, email, password, firstname, lastname) VALUES($1, $2, $3, $4, $5)",
		[id, email, hashedPassword, firstname, lastname]
	);

	const token = jwt.sign(
		{ firstname, lastname, id, email, admin: false },
		process.env.JWT_SECRET as string,
		{
			expiresIn: "24h"
		}
	);

	res.status(200).json({ token });
});

// @desc Sign up
// @route POST /auth/signin
// @access public
const signIn = expressAsyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ message: "All fields are required" });
		return;
	}

	const users = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

	if (!users.rowCount) {
		res.status(404).json({ message: "No user found" });
		return;
	}

	const user: User = users.rows[0];

	const success = await bcrypt.compare(password, user.password);

	const token = jwt.sign(
		{
			id: user.id,
			email,
			admin: user.admin,
			firstname: user.firstname,
			lastname: user.lastname
		},
		process.env.JWT_SECRET as string,
		{ expiresIn: "24h" }
	);

	if (!success) {
		res.status(401).json({ message: "Sign In failed" });
		return;
	}

	res.status(200).json({
		token
	});
});

export default {
	signUp,
	signIn
};
