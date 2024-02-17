const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field, example: ivan@gmail.com",
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

module.exports = { signupSchema, verifyEmailSchema, signinSchema };
