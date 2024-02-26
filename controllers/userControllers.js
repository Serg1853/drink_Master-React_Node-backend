const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/User");
const { HttpError, ctrlWrapper } = require("../helpers");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const signupUser = async (req, res, next) => {
  const { name, email, password, age } = req.body;
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
      age,
    },
  });
};

const signinUser = async (req, res, next) => {
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
      age: user.age,
    },
  });
};

const getCurrent = (req, res) => {
	const { email, name, avatarURL } = req.user;
  res.status(200).json({ email, name, avatarURL });
};

const signoutUser = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};


const updateUser = async (req, res) => {
  const { body, file, user } = req;
  console.log('file', file)
  if (!file) {
    throw HttpError(400, "Avatar must be provided");
  }
  const { path: tempUpload, originalname } = req.file;
  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar
        .resize(50, 50) // resize
        .quality(60) // set JPEG quality
        .write(tempUpload); // save
    })
    .catch((err) => {
      throw err;
    });
    const { _id } = user;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.resolve("public", "avatars", filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { $set: { name: body.name, avatarURL: avatarURL } },
    { new: true }
  );

  res.json({
    message: "Avatar is update",
    user: {
      name: updateUser.name,
      email: updateUser.email,
      avatarURL: updateUser.avatarURL,
    },
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  signupUser: ctrlWrapper(signupUser),
  signinUser: ctrlWrapper(signinUser),
  updateUser: ctrlWrapper(updateUser),
  updateSubscription: ctrlWrapper(updateSubscription),
  // updateUserAvatar: ctrlWrapper(updateUserAvatar),
  signoutUser: ctrlWrapper(signoutUser),
  getCurrent: ctrlWrapper(getCurrent),
};
