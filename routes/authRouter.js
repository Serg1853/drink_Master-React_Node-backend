const express = require("express");
const { validateBody, authenticate } = require("../middlewares/");
const {
	signupSchema,
	signinSchema,
	subscriptionListSchema,
} = require("../schemas/userSchemas");

const {
	signupUser,
	signinUser,
	logoutUser,
} = require("../controllers/userControllers");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signupSchema), signupUser);

authRouter.post("/signin", validateBody(signinSchema), signinUser);

authRouter.post("/logout", authenticate, logoutUser);

module.exports = authRouter;
