import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

import pool from "../config/db";
import { Job } from "../types/Job";

// @desc Get a job
// @route GET /jobs
// @access private
const getJob = expressAsyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const jobQuery = `
            SELECT 
                jobs.id,
                jobs.title,
                jobs.description,
                jobs.tags,
                jobs.desired_profile,
                companies.name AS company_name,
                companies.description AS company_description,
                jobs.company_id
            FROM 
                jobs
            JOIN 
                companies ON jobs.company_id = companies.id
            WHERE 
                jobs.id = $1;
        `;

	const queryResult = await pool.query(jobQuery, [id]);
	const job: Job = queryResult.rows[0];

	if (!job) {
		res.status(404).json({ message: "Job not found" });
		return;
	}

	res.json(job);
});
// @desc Get all jobs
// @route GET /jobs
// @access private
const getJobs = expressAsyncHandler(async (req: Request, res: Response) => {
	const { search } = req.query;
	const jobsQuery = `
		SELECT 
			jobs.id,
			jobs.title,
			jobs.tags,
			jobs.description,
			jobs.desired_profile,
			companies.name AS company_name,
			companies.description AS company_description,
			jobs.company_id
		FROM 
			jobs
		JOIN 
			companies ON jobs.company_id = companies.id
		WHERE 
			($1::text IS NULL OR LOWER(jobs.title) LIKE LOWER('%' || $1 || '%'));
	`;

	const queryResult = await pool.query(jobsQuery, [search]);
	const jobs: Job[] = queryResult.rows;

	const pageIndex = req.query.pageIndex ? Number(req.query.pageIndex) : 0;
	const jobsPerPage = 4;
	const totalJobs = jobs.length;
	const totalPages = Math.ceil(totalJobs / jobsPerPage);

	const currentJobs = jobs.slice(pageIndex * jobsPerPage, pageIndex * jobsPerPage + jobsPerPage);

	res.json({ currentJobs, totalPages, totalJobs });
});

// @desc Create a job
// @route POST /jobs
// @access private
const createJob = expressAsyncHandler(async (req: Request, res: Response) => {
	const id = uuidv4();
	const { title, tags, description, desired_profile, company_id } = req.body;

	await pool.query(
		"INSERT INTO jobs(id, title, tags, description, desired_profile, company_id) VALUES($1, $2, $3::json, $4, $5, $6) RETURNING *",
		[id, title, JSON.stringify(tags), description, desired_profile, company_id]
	);

	const createdJobQuery = `
    SELECT 
        jobs.id,
        jobs.title,
        jobs.tags,
        jobs.description,
        jobs.desired_profile,
        companies.name AS company_name,
        companies.description AS company_description,
        jobs.company_id
    FROM 
        jobs
    JOIN 
        companies ON jobs.company_id = companies.id
    WHERE 
        jobs.id = $1;
`;

	const createdJobResult = await pool.query(createdJobQuery, [id]);
	res.json(createdJobResult.rows[0]);
});

// @desc Update a job
// @route PUT /jobs
// @access private
const updateJob = expressAsyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, tags, description, desired_profile, company_id } = req.body;

	await pool.query(
		"UPDATE jobs SET title = $1, tags = $2::json, description = $3, desired_profile = $4, company_id = $5 WHERE id = $6 RETURNING *",
		[title, JSON.stringify(tags), description, desired_profile, company_id, id]
	);

	const updatedJobQuery = `
    SELECT 
        jobs.id,
        jobs.title,
        jobs.tags,
        jobs.description,
        jobs.desired_profile,
        companies.name AS company_name,
        companies.description AS company_description,
        jobs.company_id
    FROM 
        jobs
    JOIN 
        companies ON jobs.company_id = companies.id
    WHERE 
        jobs.id = $1;
`;

	const updatedJobResult = await pool.query(updatedJobQuery, [id]);
	res.json(updatedJobResult.rows[0]);
});

// @desc Delete a job
// @route DELETE /jobs
// @access private
const deleteJob = expressAsyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const deletedJob = await pool.query("DELETE FROM jobs WHERE id = $1", [id]);

	res.json(deletedJob);
});

export default {
	getJob,
	getJobs,
	createJob,
	updateJob,
	deleteJob
};
