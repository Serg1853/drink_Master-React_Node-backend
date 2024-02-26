const Joi = require("joi");

const validateIngredients = (value, helpers) => {
	try {
		const items = JSON.parse(value);
		if (!Array.isArray(items)) {
			throw new Error("Invalid ingredients data");
		}

		const schema = Joi.object({
			title: Joi.string().required(),
			measure: Joi.string().required(),
			ingredientId: Joi.string().required(),
		});

		for (const item of items) {
			const { error } = schema.validate(item);
			if (error) {
				throw error;
			}
		}

		return value;
	} catch (error) {
		throw new Error("Invalid ingredients data");
	}
};

const addDrinkSchema = Joi.object({
	drink: Joi.string()
		.required()
		.messages({ "any.required": "missing required name field" }),
	description: Joi.string()
		.required()
		.messages({ "any.required": "missing required description field" }),
	category: Joi.string()
		.required()
		.messages({ "any.required": "missing required category field" }),
	glass: Joi.string()
		.required()
		.messages({ "any.required": "missing required glass field" }),
	alcoholic: Joi.string()
		.required()
		.messages({ "any.required": "missing required alcohol/not alcohol field" }),
	ingredients: Joi.string()
		.required()
		.custom(validateIngredients)
		.messages({ "any.invalid": "Ingredients data are wrong" }),
	instructions: Joi.string()
		.required()
		.messages({ "any.required": "missing required instruction field" }),
	drinkThumb: Joi.string()
		.required()
		.messages({ "any.required": "You must to add image" }),
});

module.exports = addDrinkSchema;
