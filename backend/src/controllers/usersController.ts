import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import pool from "../config/db";
import { User } from "../types/User";

// @desc Get a user
// @route GET /users
// @access private
const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const query_result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
	const user: User = query_result.rows[0];

	if (!query_result.rowCount) {
		res.status(400).json({ message: "No user found" });
		return;
	}

	res.json(user);
};

// @desc Get all users
// @route GET /users
// @access private
const getUsers = async (req: Request, res: Response) => {
	const query_result = await pool.query("SELECT * FROM users");
	const users: User[] = query_result.rows;

	if (!query_result.rowCount) {
		res.status(400).json({ message: "No users found" });
		return;
	}

	res.status(200).json(users);
};

// @desc Create a user
// @route POST /users
// @access private
const createUser = async (req: Request, res: Response) => {
	res.status(204).json({ message: "Use the signup form" });
};

// @desc Update a user
// @route PUT /users
// @access private
const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { email, firstname, lastname } = req.body;

	const editedUser = await pool.query(
		"UPDATE users SET email = $1, firstname = $2, lastname = $3 WHERE id = $4",
		[email, firstname, lastname, id]
	);

	const query_result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
	const user: User = query_result.rows[0];

	const token = jwt.sign(
		{
			id: id,
			email: email,
			admin: user.admin,
			firstname: firstname,
			lastname: lastname
		},
		process.env.JWT_SECRET as string,
		{ expiresIn: "24h" }
	);

	res.status(200).json({
		token
	});
};

// @desc Delete a user
// @route DELETE /users
// @access private
const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const deletedUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);

	res.status(200).json({ message: "User deleted" });
};

export default {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser
};
