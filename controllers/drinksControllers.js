const Ingredient = require("../models/Ingredient");

const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Ingredient.find();
  res.json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
