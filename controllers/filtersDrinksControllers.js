const ctrlWrapper = require("../helpers/ctrlWrapper");
const categories = require("../models/categories");
const containers = require("../models/containers");
const Ingredient = require("../models/Ingredient");

const getCategoriesController = async (req, res) => {
	const result = await categories.getCategories();
	res.json(result);
};

const getContainersController = async (req, res) => {
	const result = await containers.getContainers();
	res.json(result);
};

const getIngredientsController = async (req, res) => {
    const result = await Ingredient.find();
	res.json(result);
};

module.exports = {
	getCategoriesController: ctrlWrapper(getCategoriesController),
	getContainersController: ctrlWrapper(getContainersController),
	getIngredientsController: ctrlWrapper(getIngredientsController),
};
