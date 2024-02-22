const express = require("express");
const drinksRouter = express.Router();
const { validateBody, isEmptyBody, authenticate } = require("../middlewares");
const addDrinkSchema = require("../schemas/addDrinkSchema");

const {
  getAll,
  findDrinkByCategoryAndIngredients,
  getById,
  addOwnDrink,
  getOwnDrink,
  removeOwnDrink,
  addFavorite,
  deleteFavorite,
  getFavorite,
} = require("../controllers/drinksControllers");

drinksRouter.get("/mainpage", getAll);

drinksRouter.get("/:id", authenticate, getById);

drinksRouter.get("/popular");

drinksRouter.get("/search", findDrinkByCategoryAndIngredients);

drinksRouter.post(
  "/own/add",
  isEmptyBody,
  authenticate,
  validateBody(addDrinkSchema),
  addOwnDrink
);

drinksRouter.delete("/own/remove", authenticate, removeOwnDrink);

drinksRouter.get("/own", authenticate, getOwnDrink);

drinksRouter.post("/favorite/add/:id", authenticate, addFavorite);

drinksRouter.delete("/favorite/remove", authenticate, deleteFavorite);

drinksRouter.get("/favorite", authenticate, getFavorite);

module.exports = drinksRouter;
