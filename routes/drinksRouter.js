const express = require("express");
const drinksRouter = express.Router();

// const { authenticate } = require("../middlewares/authenticate");
const { getAll, getById } = require("../controllers/drinksControllers");

drinksRouter.get("/mainpage", getAll);

drinksRouter.get("/:id", getById);

drinksRouter.get("/popular");

drinksRouter.get("/search");

drinksRouter.post("/own/add");

drinksRouter.delete("/own/remove");

drinksRouter.get("/own");

drinksRouter.post("/favorite/add");

drinksRouter.delete("/favorite/remove");

drinksRouter.get("/favorite");

module.exports = drinksRouter;
