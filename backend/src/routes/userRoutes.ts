import express from "express";

import usersController from "../controllers/usersController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router.use(verifyJWT);

router
	.route("/")
	.get(verifyAdmin(), usersController.getUsers)
	.post(verifyAdmin(), usersController.createUser);

router
	.route("/:id")
	.get(usersController.getUser)
	.put(usersController.updateUser)
	.delete(usersController.deleteUser);

module.exports = router;
