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
	signoutUser,
} = require("../controllers/userControllers");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signupSchema), signupUser);

authRouter.post("/signin", validateBody(signinSchema), signinUser);

authRouter.post("/signout", authenticate, signoutUser);

module.exports = authRouter;
