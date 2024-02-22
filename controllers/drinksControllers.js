const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
const { ctrlWrapper, HttpError } = require("../helpers");
const Recipe = require("../models/Recipe");

const getAll = async (req, res) => {
  const limit = 12;
  const result = await Recipe.find().limit(limit);
  res.json(result);
};

const findDrinkByFiltrs = async (req, res) => {
  const { category, ingredient, keyWord } = req.body;
  const { page = 1, limit = 9 } = req.query;

  const query = {};
  category && (query.category = category);

  ingredient && (query.ingredients = { $elemMatch: { id: ingredient } });

  keyWord && (query.drink = { $regex: keyWord, $options: "i" });
  keyWord && (query.description = { $regex: keyWord, $options: "i" });

  const result = await Recipe.find(query)
    .limit(limit)
    .skip((page - 1) * limit);
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

const getPopularDrinks = async (req, res) => {
  const popularDrinks = await Recipe.find({
    users: { $exists: true, $ne: [] },
  })
    .sort({ users: -1 })
    .exec();

  res.json(popularDrinks);
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

const getFavorite = async (req, res) => {
  const { users } = req.body;
  const result = await Recipe.find({ users });
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
  res.json(result);
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
