import Joi from "joi";

export const signupSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required().messages({
		"any.required": "missing required email fiel, example: ivan@gmail.com",
	}),
	password: Joi.string()
		.required()
		.min(6)
		.messages({ "any.required": "missing required password  field" }),
});

export const verifyEmailSchema = Joi.object({
	email: Joi.string()
		.pattern(emailRegexp)
		.required()
		.messages({ "any.required": "missing required field email" }),
});

export const singinSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({
		"any.required": "missing required email field, example: ivan@gmail.com",
	}),
	password: Joi.string()
		.required()
		.min(6)
		.messages({ "any.required": "missing required password field" }),
});
