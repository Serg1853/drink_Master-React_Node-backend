const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const path = require("path");
const { nanoid } = require("nanoid");

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
  const { email, name, avatarURL, age } = req.user;
  res.status(200).json({ email, name, avatarURL, age });
};

const signoutUser = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateUser = async (req, res) => {
  const { body, file, user } = req;

  if (file) {
    const uniqueFilename = nanoid();
    const extension = path.extname(file.originalname);
    const fileName = `${uniqueFilename}${extension}`;

    const result = await cloudinary.uploader.upload(file.path, {
      public_id: `${fileName}`,
      folder: "avatars",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    await cloudinary.uploader.destroy(file.filename);

    const avatarURL = result.secure_url;
    user.avatarURL = avatarURL;
  } else {
    user.avatarURL = user.avatar;
  }

  const { _id } = user;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { $set: { name: body.name, avatarURL: user.avatarURL } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: "Avatar uploaded successfully",
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      avatarURL: updatedUser.avatarURL,
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
