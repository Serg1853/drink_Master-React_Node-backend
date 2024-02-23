const ctrlWrapper = require("../helpers/ctrlWrapper");
const categories = require("../models/сategories");
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
	const { age } = req.user;
	let filter = {};
	if (age < 18) {
		filter.alcohol = "No";
	} else {
		filter.alcohol = "Yes";
	}
	const result = await Ingredient.find(filter);
	res.json(result);
};

module.exports = {
	getCategories: ctrlWrapper(getCategoriesController),
	getGlasses: ctrlWrapper(getGlassesController),
	getIngredients: ctrlWrapper(getIngredientsController),
};
