const express = require("express");
const {
  getCurrent,
  logoutUser,
  singinUser,
  singupUser,
  updateAvatar,
} = require("../controllers/userControllers");
const validateBody = require("../middlewares/validateBody");
const { signupSchema, singinSchema } = require("../schemas/userSchemas");
const authenticate = require("../middlewares/authenticate");
const storage = require("../middlewares/upload");


const usersRouter = express.Router();

usersRouter.post("/singup", validateBody(signupSchema), singupUser);

usersRouter.post("/singin", validateBody(singinSchema), singinUser);

usersRouter.post("/logout", authenticate, logoutUser);

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.patch(
  "/avatar",
  authenticate,
  storage.single("avatar"),
  updateAvatar
);

module.exports = usersRouter;
