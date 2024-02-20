const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const subscriptionList = [
	"agree to subscription",
	"do not agree to subscription",
];
const userSchema = new Schema(
	{
		name: {
			type: String,
			minLength: [2, "Name must be at least 2 characters long"],
			maxLength: [32, "Name must be max 32 characters long"],
			required: true,
		},
		email: {
			type: String,
			match: [emailRegexp, "Email is incorrect"],
			required: [true, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		subscription: {
			type: String,
			enum: subscriptionList,
			default: "agree to subscription",
		},
		token: {
			type: String,
			default: "",
		},
		avatarURL: {
			type: String,
			require: true,
		},
		age: {
			type: Number,
			require: true,
		},
	},
	{ versionKey: false }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User };
