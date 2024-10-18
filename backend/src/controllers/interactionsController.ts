import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

import pool from "../config/db";
import { Interaction } from "../types/Interaction";

// @desc Get all interactions
// @route GET /interactions
// @access public
const getInteractions = expressAsyncHandler(async (req: Request, res: Response) => {
	const { user_id, job_id } = req.query;

	if (!user_id) {
		return;
	}

	if (job_id && user_id) {
		const queryResult = await pool.query(
			"SELECT * FROM interactions WHERE user_id = $1 AND job_id = $2",
			[user_id, job_id]
		);
		const interaction: Interaction = queryResult.rows[0];
		res.json(interaction);
		return;
	}

	if (user_id) {
		const queryResult = await pool.query("SELECT * FROM interactions WHERE user_id = $1", [
			user_id
		]);
		const interactions: Interaction[] = queryResult.rows;
		res.json(interactions);
		return;
	}
});

// @desc Update an nteraction
// @route PUT /interactions
// @access public
const updateInteraction = expressAsyncHandler(async (req: Request, res: Response) => {
	const interactionData: Interaction = req.body.interactionData;
	const id = uuidv4();

	const interaction = await pool.query(
		"SELECT * FROM interactions WHERE user_id = $1 AND job_id = $2",
		[interactionData.user_id, interactionData.job_id]
	);

	if (!interaction.rowCount) {
		await pool.query(
			"INSERT INTO interactions(id, user_id, job_id, status) VALUES($1, $2, $3, $4)",
			[id, interactionData.user_id, interactionData.job_id, interactionData.status]
		);
	}

	const editedInteraction = await pool.query(
		"UPDATE interactions SET status = $1 WHERE user_id = $2 AND job_id = $3",
		[interactionData.status, interactionData.user_id, interactionData.job_id]
	);

	res.json(editedInteraction);
});

// @desc Delete an nteraction
// @route DELETE /interactions
// @access public
const deleteInteraction = expressAsyncHandler(async (req: Request, res: Response) => {
	const interactionData: Interaction = req.body.interactionData;

	const deletedInteraction = await pool.query(
		"DELETE FROM interactions WHERE user_id = $1 AND job_id = $2",
		[interactionData.user_id, interactionData.job_id]
	);

	res.json(deletedInteraction);
});

export default {
	getInteractions,
	updateInteraction,
	deleteInteraction
};
