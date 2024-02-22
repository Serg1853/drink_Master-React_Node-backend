const express = require("express");
const drinksRouter = express.Router();
const { validateBody, isEmptyBody, authenticate } = require("../middlewares");
const addDrinkSchema = require("../schemas/addDrinkSchema");

const {
	getAll,
	findDrinkByFiltrs,
	getById,
	addOwnDrink,
	getOwnDrink,
	removeOwnDrink,
	getPopularDrinks,
	addFavorite,
	getFavorite,
	deleteFavorite,
} = require("../controllers/drinksControllers");

drinksRouter.get("/mainpage", getAll);

drinksRouter.get("/:id", authenticate, getById);

drinksRouter.get("/popular", authenticate, getPopularDrinks);

drinksRouter.get("/search", findDrinkByFiltrs);

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

drinksRouter.delete("/favorite/remove/:id", authenticate, deleteFavorite);

drinksRouter.get("/favorite", authenticate, getFavorite);

module.exports = drinksRouter;
