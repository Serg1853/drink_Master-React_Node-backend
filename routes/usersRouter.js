const express = require("express");
const {
  getCurrent,
  logoutUser,
  signinUser,
  signupUser,
  updateAvatar,
  updateSubscription,
} = require("../controllers/userControllers");
const validateBody = require("../middlewares/validateBody");
const {
  signupSchema,
  signinSchema,
  subscriptionListSchema,
} = require("../schemas/userSchemas");
const authenticate = require("../middlewares/authenticate");
const storage = require("../middlewares/upload");

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(signupSchema), signupUser);

usersRouter.post("/signin", validateBody(signinSchema), signinUser);

usersRouter.post("/logout", authenticate, logoutUser);

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
