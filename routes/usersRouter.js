const express = require("express");
const {
	getCurrent,
	updateAvatar,
	updateSubscription,
} = require("../controllers/userControllers");
const { validateBody, authenticate, storage } = require("../middlewares/");
const { subscriptionListSchema } = require("../schemas/userSchemas");

const usersRouter = express.Router();

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.patch(
	"/avatar",
	authenticate,
	storage.single("avatar"),
	updateAvatar
);
usersRouter.patch(
	"/",
	authenticate,
	validateBody(subscriptionListSchema),
	updateSubscription
);

module.exports = usersRouter;
