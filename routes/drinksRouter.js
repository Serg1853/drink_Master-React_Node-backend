const express = require("express");
const drinksRouter = express.Router();

const { authenticate } = require("../middlewares/authenticate");
const { getAll } = require("../controllers/drinksControllers");

drinksRouter.get("/mainpage", getAll);

module.exports = drinksRouter;
