const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../models/User");
const { HttpError, ctrlWrapper } = require("../helpers");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const singupUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "User already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({
    token,
    user: {
      name,
      email,
      avatarURL,
    },
  });
};

const singinUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      name: user.name,
      email,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, name, avatar: avatarURL } = req.user;
  res.status(200).json({ email, name, avatarURL });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { file } = req;
  if (!file) {
    throw HttpError(400, "You need file");
  }
  const { path: tempUpload, originalname } = file;
  const newName = `${_id}${originalname}`;
  const resultUpload = path.resolve("public", "avatars", newName);
  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join("avatars", newName);
  await User.findByIdAndUpdate(_id, { avatar }, { new: true });
  res.status(200).json({ avatar });
};

module.exports = {
  singupUser: ctrlWrapper(singupUser),
  singinUser: ctrlWrapper(singinUser),
  updateAvatar: ctrlWrapper(updateAvatar),
  logoutUser,
  getCurrent,
};
