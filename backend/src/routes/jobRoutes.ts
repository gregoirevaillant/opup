import express from "express";

import jobsController from "../controllers/jobsController";
import verifyAdmin from "../middleware/verifyAdmin";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.route("/").get(jobsController.getJobs);
router.route("/:id").get(jobsController.getJob);

router.use(verifyJWT);

router.route("/").post(verifyAdmin(), jobsController.createJob);
router
	.route("/:id")
	.put(verifyAdmin(), jobsController.updateJob)
	.delete(verifyAdmin(), jobsController.deleteJob);

module.exports = router;
