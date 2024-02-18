const { Schema, model } = require("mongoose");

const alcoholList = ["Yes", "No"];

const drinksSchema = new Schema({
  title: {
    type: String,
  },
  alcohol: {
    type: String,
    enum: alcoholList,
    default: "Yes",
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
});

const Drinks = model("drink", drinksSchema);

module.exports = Drinks;
