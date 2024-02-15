import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			match: emailRegexp,
			required: [true, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			default: "",
		},
		avatarURL: {
			type: String,
			require: true,
		},
	},
	{ versionKey: false }
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
