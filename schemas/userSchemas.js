const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = [
	"agree to subscription",
	"do not agree to subscription",
];

const signupSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required().messages({
		"string.base": "The email must be a string.",
		"any.required": "The email field is required.",
		"string.empty": "The email must not be empty.",
		"string.pattern.base": "The email must be in format alex@gmail.com.",
	}),
	age: Joi.number().integer().required().messages({
		"number.base": "age must be a number",
		"any.required": "please add your age",
	}),
	password: Joi.string()
		.required()
		.min(6)
		.messages({ "any.required": "missing required password  field" }),
});
const verifyEmailSchema = Joi.object({
	email: Joi.string()
		.pattern(emailRegexp)
		.required()
		.messages({ "any.required": "missing required field email" }),
});

const signinSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({
		"any.required": "missing required email field, example: ivan@gmail.com",
	}),
	password: Joi.string()
		.required()
		.min(6)
		.messages({ "any.required": "missing required password field" }),
});
const subscriptionListSchema = Joi.object({
	subscription: Joi.string()
		.valid(...subscriptionList)
		.required(),
});

module.exports = {
	signupSchema,
	verifyEmailSchema,
	signinSchema,
	subscriptionListSchema,
};
