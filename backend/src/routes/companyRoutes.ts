import express from "express";
import companiesController from "../controllers/companiesController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router.use(verifyJWT);

router
	.route("/")
	.get(verifyAdmin(), companiesController.getCompanies)
	.post(verifyAdmin(), companiesController.createCompany);

router
	.route("/:id")
	.put(companiesController.updateCompany)
	.delete(companiesController.deleteCompany);

module.exports = router;
