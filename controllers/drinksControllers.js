const { ctrlWrapper, HttpError } = require("../helpers");
const Recipe = require("../models/Recipe");

const getAll = async (req, res) => {
	const result = await Recipe.find();
	res.json(result);
};

const findDrinkByCategoryAndIngredients = async (req, res) => {
	const { category, ingredient, drinkStartsWith } = req.body;

	let query = {};
	if (category) {
		query.category = category;
	}
	if (ingredient) {
		query["ingredients.title"] = ingredient;
	}
	if (drinkStartsWith) {
		query.drink = { $regex: new RegExp("^" + drinkStartsWith, "i") };
	}

	const result = await Recipe.find(query);
	res.json(result);
};

const getById = async (req, res, next) => {
	const { id } = req.params;

	const result = await Recipe.findById({ _id: id }).populate(
		"ingredients.ingredientId",
		"ingredientThumb thumb-medium thumb-small"
	);
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

const getOwnDrink = async (req, res) => {

	const { _id: owner } = req.user;
	const result = await Recipe.find({ owner });
	res.json(result);
};

const removeOwnDrink = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await Recipe.findOneAndDelete({ _id: id, owner });
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({ message: "drink deleted" });

};

const addFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Recipe.findByIdAndUpdate(
    id,
    { $push: { users: owner } },
    { new: true }
  );
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addOwnDrink: ctrlWrapper(addOwnDrink),
  findDrinkByCategoryAndIngredients: ctrlWrapper(
    findDrinkByCategoryAndIngredients
  ),
  getOwnDrink: ctrlWrapper(getOwnDrink),
  removeOwnDrink: ctrlWrapper(removeOwnDrink),
  addFavorite: ctrlWrapper(addFavorite),
};
