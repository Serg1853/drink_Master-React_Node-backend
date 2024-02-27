const authenticate = require("./authenticate");
const isEmptyBody = require("./isEmptyBody");
const isValidId = require("./isValidId");
const storage = require("./upload");
const validateBody = require("./validateBody");
const uploadDrinkImage = require("./uploadDrinkImage");

module.exports = {
	validateBody,
	isEmptyBody,
	authenticate,
	storage,
	isValidId,
	uploadDrinkImage,
};
