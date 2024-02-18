const express = require("express");
const {
  getCurrent,
  updateAvatar,
  updateSubscription,
} = require("../controllers/userControllers");
const validateBody = require("../middlewares/validateBody");
const { subscriptionListSchema } = require("../schemas/userSchemas");
const authenticate = require("../middlewares/authenticate");
const storage = require("../middlewares/upload");

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
