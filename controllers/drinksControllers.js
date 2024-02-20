const { ctrlWrapper, HttpError } = require("../helpers");
const Ingredient = require("../models/Ingredient");

const getAll = async (req, res) => {
	const result = await Ingredient.find();
	res.json(result);
};

const getById = async (req, res, next) => {
	const { id } = req.params;

	const result = await Ingredient.findOne({ _id: id });
	if (result === null) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const addOwnDrink = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Contact.create({ ...req.body, owner });
	res.status(201).json(result);
};

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	addOwnDrink: ctrlWrapper(addOwnDrink),
};
