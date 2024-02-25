const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
const { ctrlWrapper, HttpError } = require("../helpers");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const { User } = require("../models/User");

const getAll = async (req, res) => {
	const { age } = req.user;

	let filter = {};
	if (age < 18) {
		filter.alcoholic = "Non alcoholic";
	} else {
		filter.alcoholic = "Alcoholic";
	}
	// const result = await Recipe.find(filter);

	const limit = 200;
	const result = await Recipe.aggregate([
		{ $match: filter },
		{ $sample: { size: limit } },
	]);

	res.json(result);
};

const findDrinkByFiltrs = async (req, res) => {

  const { age } = req.user;
  const { page = 1, limit = 10 } = req.query;
  let skip = (page - 1) * limit;

  const keys = Object.keys(req.query);
  let paramSearch = {};
  for (const key of keys) {
    if (key === "drink" || key === "category" || key === "ingredients.title") {
      paramSearch = {
        ...paramSearch,
        [key]: { $regex: new RegExp(req.query[key], "i") },
      };
    }
  }
  //   const age = 29;
  let searchFilters = { ...paramSearch, alcoholic: "Non alcoholic" };
  if (age > 18) {
    searchFilters = { ...paramSearch };
  }

  const resultCount = await Recipe.find(searchFilters).count();
  if (skip >= resultCount) {
    if (resultCount < limit) {
      skip = 0;
    } else {
      skip = resultCount - limit;
    }
  }
  console.log("page", page);
  console.log("limit", limit);
  console.log("skip", skip);
  console.log("resultCount", resultCount);
  console.log("paramSearch", paramSearch);

  const result = await Recipe.find(searchFilters, { Recipe }, { skip, limit });

  if (!result || !result.length) {
    throw HttpError(404, "Not found, try again");
  }

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
	try {
		const result = await Recipe.create({
			...req.body,
			owner,
			ingredients: JSON.parse(req.body.ingredients),
		});
		res.status(201).json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getOwnDrink = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Recipe.find({ owner });
	res.json(result);
};

const removeOwnDrink = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await Recipe.findOneAndDelete({
		_id: id,
		users: owner,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({ message: "drink deleted" });
};

const getPopularDrinks = async (req, res) => {
	const { age } = req.user;

	let filter = {};
	if (age < 18) {
		filter.alcoholic = "Non alcoholic";
	} else {
		filter.alcoholic = "Alcoholic";
	}

	const popularDrinks = await Recipe.aggregate([
		{
			$match: {
				users: { $exists: true, $ne: [] },
				...filter,
			},
		},
		{
			$addFields: {
				usersCount: { $size: "$users" },
			},
		},
		{
			$sort: {
				usersCount: -1,
			},
		},
	]);
	res.json(popularDrinks);
};

const getFavorite = async (req, res) => {
	const { _id: owner } = req.user;
	const favoriteDrinks = await Recipe.find({ users: owner }).populate("owner");
	res.json(favoriteDrinks);
};

const addFavorite = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;

	const result = await Recipe.findByIdAndUpdate(
		id,
		{ $addToSet: { users: owner } },
		{ new: true }
	);
	res.json(result);
};

const deleteFavorite = async (req, res) => {
	const { id } = req.params;
	const { _id } = req.user;
	console.log("_id", _id);
	const result = await Recipe.findByIdAndUpdate(
		id,
		{
			$pull: { users: _id },
		},
		{ new: true }
	);
	res.json({
		message: "Cocktail is delete",
	});
};

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	addOwnDrink: ctrlWrapper(addOwnDrink),
	findDrinkByFiltrs: ctrlWrapper(findDrinkByFiltrs),
	getOwnDrink: ctrlWrapper(getOwnDrink),
	removeOwnDrink: ctrlWrapper(removeOwnDrink),
	getPopularDrinks: ctrlWrapper(getPopularDrinks),
	addFavorite: ctrlWrapper(addFavorite),
	getFavorite: ctrlWrapper(getFavorite),
	deleteFavorite: ctrlWrapper(deleteFavorite),
};
