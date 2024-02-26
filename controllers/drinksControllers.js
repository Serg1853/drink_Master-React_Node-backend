const mongoose = require("mongoose");
const path = require("path");
const { nanoid } = require("@reduxjs/toolkit");
const cloudinary = require("cloudinary").v2;
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

	const result = await Recipe.find(searchFilters, { Recipe }, { skip, limit });

	if (!result || !result.length) {
		throw HttpError(404, "Not found, try again");
	}

	res.json({
		result: result,
		count: resultCount,
	});
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

const addOwnDrink = async (req, res, next) => {
	const { file } = req;
	const uniqueFilename = nanoid();
	const extension = path.extname(file.originalname);
	const fileName = `${uniqueFilename}${extension}`;

	const resultfromCloud = await cloudinary.uploader.upload(file.path, {
		public_id: `${fileName}`,
		folder: "drink",
		use_filename: true,
		unique_filename: false,
		overwrite: true,
	});

	await cloudinary.uploader.destroy(file.filename);

	const imageDrinkUrl = resultfromCloud.secure_url;

	const { _id: owner, age } = req.user;

	const {
		drink,
		description,
		category,
		glass,
		alcoholic,
		instructions,
		ingredients,
	} = req.body;

	if (alcoholic === "Alcoholic" && age < 18) {
		throw HttpError(400);
	}
	const newDrink = new Recipe({
		drink,
		description,
		category,
		glass,
		alcoholic,
		instructions,
		drinkThumb: imageDrinkUrl,
		ingredients: ingredients.map(({ title, measure, ingredientId }) => ({
			title,
			measure,
			ingredientId,
		})),
		owner: owner,
	});

	const firstResult = await Recipe.create(newDrink);
	const updatedResult = await Recipe.findById(firstResult._id).select(
		"-createdAt -updatedAt"
	);
	res.status(201).json(updatedResult);
};

const getOwnDrink = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Recipe.find({ owner });
	res.json(result);
};

const removeOwnDrink = async (req, res) => {
	const { id: drinkId } = req.params;
	const { _id } = req.user;
	const owner = _id.toString();

	const result = await Recipe.findOneAndDelete({
		_id: drinkId,
		owner: owner,
	});
	if (!result) {
		throw HttpError(404, "Not found or user is not the owner");
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
