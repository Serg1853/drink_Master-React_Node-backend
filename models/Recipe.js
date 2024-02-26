const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const drinkSchema = new Schema(
	{
		drink: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		glass: {
			type: String,
			required: true,
		},
		alcoholic: {
			type: String,
			required: true,
		},
		drinkThumb: {
			type: String,
			required: true,
		},
		ingredients: {
			type: [
				{
					title: {
						type: String,
						required: true,
					},
					measure: {
						type: String,
						required: true,
					},
					ingredientId: {
						type: Schema.Types.ObjectId,
						required: true,
						ref: "ingredient",
					},
				},
			],
			required: true,
		},
		instructions: {
			type: String,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		users: {
			type: [],
		},
	},
	{ versionKey: false, timestamps: true }
);

drinkSchema.post("save", handleMongooseError);
const Recipe = model("recipe", drinkSchema);

module.exports = Recipe;
