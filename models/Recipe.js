const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

// const alcoholList = ["Yes", "No"];

const drinkSchema = new Schema(
  {
    file: String,
    drink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    glass: {
      type: String,
      required: true,
    },
    alcoholic: {
      type: String,
      required: true,
      // enum: alcoholList,
      // default: "Yes",
    },
    ingredients: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          measure: {
            type: String,
            required: true,
          },
          ingredientId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "ingredient",
          },
        },
      ],
      required: true,
    },
    instructions: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    //    favorite: {
    //       type: [],
    //     },
  },
  { versionKey: false, timestamps: true }
);

drinkSchema.post("save", handleMongooseError);
const Recipe = model("recipe", drinkSchema);

module.exports = Recipe;
