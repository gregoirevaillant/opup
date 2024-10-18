import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);

module.exports = router;
