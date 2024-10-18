import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import pool from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { Company } from "../types/Company";

// @desc Get all companies
// @route GET /companies
// @access private
const getCompanies = expressAsyncHandler(async (req: Request, res: Response) => {
	const query_result = await pool.query("SELECT * FROM companies");
	const companies: Company[] = query_result.rows;

	if (!query_result.rowCount) {
		res.status(400).json({ message: "No companies found" });
		return;
	}

	res.json(companies);
});

// @desc Create a company
// @route POST /companies
// @access private
const createCompany = expressAsyncHandler(async (req: Request, res: Response) => {
	const { name } = req.body;
	const id = uuidv4();

	if (!name) {
		res.json({ message: "No company name" });
		return;
	}

	const companyDuplicate = await pool.query("SELECT * FROM companies WHERE name = $1", [name]);

	if (companyDuplicate.rowCount) {
		res.json({ message: "Company name already used" });
		return;
	}

	const newCompany = await pool.query("INSERT INTO companies(name, id) VALUES($1, $2)", [
		name,
		id
	]);

	res.json(newCompany);
});

// @desc Update a company
// @route PUT /companies
// @access private
const updateCompany = expressAsyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name } = req.body;

	if (!name) {
		res.json({ message: "No company name" });
		return;
	}

	const editedCompany = await pool.query("UPDATE companies SET name = $1 WHERE id = $2", [
		name,
		id
	]);

	res.json(editedCompany);
});

// @desc Delete a company
// @route DELETE /companies
// @access private
const deleteCompany = expressAsyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const deletedCompany = await pool.query("DELETE FROM companies WHERE id = $1", [id]);

	res.json(deletedCompany);
});

export default {
	getCompanies,
	createCompany,
	updateCompany,
	deleteCompany
};
