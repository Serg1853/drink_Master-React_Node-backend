const { Schema, model } = require("mongoose");

// const alcoholList = ["Yes", "No"];

const addDrinkSchema = new Schema(
	{
		file: String,
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
			// enum: alcoholList,
			// default: "Yes",
		},
		ingredients: [
			{
				title: {
					type: String,
					required: true,
				},
				measure: {
					type: String,
					required: true,
				},
			},
		],
		instructions: {
			type: String,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);
const AddDrink = model("addDrink", addDrinkSchema);

module.exports = AddDrink;
