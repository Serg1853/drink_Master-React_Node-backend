const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
	title: String,
	ingredientThumb: String,
	thumbmedium: String,
	thumbsmall: String,
	abv: String,
	alcohol: String,
	description: String,
	type: String,
	flavour: String,
	country: String,
});

const Ingredient = model("ingredient", ingredientSchema);

module.exports = Ingredient;
