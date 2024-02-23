const Joi = require("joi");

const addDrinkSchema = Joi.object({
	file: String,
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
	ingredients: Joi.array()
		.items(
			Joi.object({
				_id: Joi.string().required(),
				title: Joi.string().required().messages({
					"any.required": "missing required ingredient name field",
				}),
				measure: Joi.string()
					.required()
					.messages({ "any.required": "missing required measure field" }),
				ingredientId: Joi.object({
					_id: Joi.string().required(),
					ingredientThumb: Joi.string().uri().optional(),
					"thumb-medium": Joi.string().uri().optional(),
					"thumb-small": Joi.string().uri().optional(),
				}).required(),
			})
		)
		.required(),
	instructions: Joi.string()
		.required()
		.messages({ "any.required": "missing required instruction field" }),
});

module.exports = addDrinkSchema;
