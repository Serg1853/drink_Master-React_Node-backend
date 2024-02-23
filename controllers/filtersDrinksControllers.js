const ctrlWrapper = require("../helpers/ctrlWrapper");
const categories = require("../models/Categories");
const glasses = require("../models/Glasses");
const Ingredient = require("../models/Ingredient");

const getCategoriesController = async (req, res) => {
	const result = await categories.getCategories();
	res.json(result);
};

const getGlassesController = async (req, res) => {
	const result = await glasses.getGlasses();
	res.json(result);
};

const getIngredientsController = async (req, res) => {
	const result = await Ingredient.find();
	res.json(result);
};

module.exports = {
	getCategories: ctrlWrapper(getCategoriesController),
	getGlasses: ctrlWrapper(getGlassesController),
	getIngredients: ctrlWrapper(getIngredientsController),
};
