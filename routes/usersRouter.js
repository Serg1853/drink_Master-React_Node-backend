const express = require("express");
const {
  getCurrent,
  logoutUser,
  singinUser,
  singupUser,
  updateAvatar,
} = require("../controllers/userControllers");
const validateBody = require("../helpers/validateBody");
const { signupSchema, singinSchema } = require("../schemas/userSchemas");
const { authenticate } = require("../middlewares/authenticate");
const { storage } = require("../middlewares/upload");

// import express from "express";
// import {
//   getCurrent,
//   logoutUser,
//   singinUser,
//   singupUser,
//   updateAvatar,
// } from "../controllers/userControllers.js";
// import validateBody from "../helpers/validateBody.js";
// import { signupSchema, singinSchema } from "../schemas/userSchemas.js";
// import { authenticate } from "../middlewares/authenticate.js";
// import { storage } from "../middlewares/upload.js";

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
