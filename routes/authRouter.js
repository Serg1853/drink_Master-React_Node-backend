const express = require("express");
const { validateBody, authenticate, isEmptyBody } = require("../middlewares/");
const { signupSchema, signinSchema } = require("../schemas/userSchemas");

const {
	signupUser,
	signinUser,
	signoutUser,
} = require("../controllers/userControllers");

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(signupSchema), signupUser);

authRouter.post("/signin", isEmptyBody, validateBody(signinSchema), signinUser);

authRouter.post("/signout", authenticate, signoutUser);

module.exports = authRouter;
