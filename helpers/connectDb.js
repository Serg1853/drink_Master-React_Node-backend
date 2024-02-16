const mongoose = require("mongoose");
require("dotenv").config();

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const { DB_HOST } = process.env;

const connectDb = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Connected is successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
