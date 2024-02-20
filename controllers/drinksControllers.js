const { ctrlWrapper, HttpError } = require("../helpers");
const Recipe = require("../models/Recipe");

const getAll = async (req, res) => {
	const result = await Recipe.find();
	res.json(result);
};

const getById = async (req, res, next) => {
	const { id } = req.params;

	const result = await Recipe.findOne({ _id: id });
	if (result === null) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const addOwnDrink = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Recipe.create({ ...req.body, owner });
	res.status(201).json(result);
};

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	addOwnDrink: ctrlWrapper(addOwnDrink),
};
