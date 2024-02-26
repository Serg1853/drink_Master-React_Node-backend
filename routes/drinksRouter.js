const express = require("express");
const drinksRouter = express.Router();
const {
	isEmptyBody,
	authenticate,
	uploadDrinkImage,
} = require("../middlewares");
// const addDrinkSchema = require("../schemas/addDrinkSchema");

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

drinksRouter.get("/mainpage", authenticate, getAll);

drinksRouter.get("/popular", authenticate, getPopularDrinks);

drinksRouter.get("/search", authenticate, findDrinkByFiltrs);

drinksRouter.post(
	"/own/add",
	authenticate,
	uploadDrinkImage.single("drinKThumb"),
	addOwnDrink
);

drinksRouter.delete("/own/remove/:id", authenticate, removeOwnDrink);

drinksRouter.get("/own", authenticate, getOwnDrink);

drinksRouter.get("/favorite", authenticate, getFavorite);

drinksRouter.post("/favorite/add/:id", authenticate, addFavorite);

drinksRouter.delete("/favorite/remove/:id", authenticate, deleteFavorite);

drinksRouter.get("/:id", authenticate, getById);

module.exports = drinksRouter;
