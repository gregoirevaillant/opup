import express from "express";

import interactionsController from "../controllers/interactionsController";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.use(verifyJWT);

router
	.route("/")
	.get(interactionsController.getInteractions)
	.put(interactionsController.updateInteraction)
	.delete(interactionsController.deleteInteraction);

module.exports = router;
