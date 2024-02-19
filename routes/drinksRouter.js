const express = require("express");
const drinksRouter = express.Router();

// const { authenticate } = require("../middlewares/authenticate");
const { getAll, getById } = require("../controllers/drinksControllers");

drinksRouter.get("/mainpage", getAll);

drinksRouter.get("/:id", getById);

module.exports = drinksRouter;
