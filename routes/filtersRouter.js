const express = require("express");
const ctrl = require("../controllers/filtersDrinksControllers");

// const authenticate = require("../middlewares/authenticate");

const filtersDrinksRouter = express.Router();

filtersDrinksRouter.get("/categories", ctrl.getCategoriesController);

filtersDrinksRouter.get("/glasses", ctrl.getGlassesController);

filtersDrinksRouter.get("/ingredients", ctrl.getIngredientsController);

module.exports = filtersDrinksRouter;
