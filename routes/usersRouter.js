import express from "express";
import {
  getCurrent,
  logoutUser,
  singinUser,
  singupUser,
} from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signupSchema, singinSchema } from "../schemas/userSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

export const usersRouter = express.Router();

usersRouter.post("/singup", validateBody(signupSchema), singupUser);

usersRouter.post("/singin", validateBody(singinSchema), singinUser);

usersRouter.post("/logout", authenticate, logoutUser);

usersRouter.get("/current", authenticate, getCurrent);
