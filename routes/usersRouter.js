import express from "express";
import { singupUser } from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signupSchema } from "../schemas/userSchemas.js";

export const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(signupSchema), singupUser);

usersRouter.post("/signin");

usersRouter.post("/logout");

usersRouter.get("/current");
