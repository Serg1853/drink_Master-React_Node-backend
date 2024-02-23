const express = require("express");
const ctrl = require("../controllers/filtersDrinksControllers");
const { authenticate } = require("../middlewares");
const filtersDrinksRouter = express.Router();

filtersDrinksRouter.get("/categories", authenticate, ctrl.getCategories);

filtersDrinksRouter.get("/glasses", authenticate, ctrl.getGlasses);

filtersDrinksRouter.get("/ingredients", authenticate, ctrl.getIngredients);

module.exports = filtersDrinksRouter;
