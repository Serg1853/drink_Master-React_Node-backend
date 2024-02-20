const { Schema, model } = require("mongoose");

// const alcoholList = ["Yes", "No"];

const drinkSchema = new Schema(
  {
    drink: {
      type: String,
      required: true,
    },
    alcoholic: {
      type: String,
      required: true,
      // enum: alcoholList,
      // default: "Yes",
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    glass: {
      type: String,
    },
    drinkThumb: {
      type: String,
    },
    instructions: {
      type: String,
    },

    popular: Number,
  },
  { versionKey: false, timestamps: true }
);

drinkSchema.post("save", handleMongooseError);
const Drink = model("drink", drinkSchema);

module.exports = Drink;
