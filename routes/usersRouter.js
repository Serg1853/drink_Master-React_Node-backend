const express = require("express");
const {
  getCurrent,
  updateSubscription,
  updateUser,
} = require("../controllers/userControllers");
const { validateBody, authenticate, storage } = require("../middlewares/");
const { subscriptionListSchema } = require("../schemas/userSchemas");

const usersRouter = express.Router();

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.patch(
  "/update",
  authenticate,
  storage.single("avatar"),
  updateUser
);
usersRouter.patch(
  "/",
  authenticate,
  validateBody(subscriptionListSchema),
  updateSubscription
);

// usersRouter.patch("/update", authenticate);

module.exports = usersRouter;
