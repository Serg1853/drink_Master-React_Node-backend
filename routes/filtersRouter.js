const express = require("express");
const ctrl = require("../controllers/filtersDrinksControllers");

const filtersDrinksRouter = express.Router();

filtersDrinksRouter.get("/categories", ctrl.getCategories);

filtersDrinksRouter.get("/glasses", ctrl.getGlasses);

filtersDrinksRouter.get("/ingredients", ctrl.getIngredients);

module.exports = filtersDrinksRouter;
