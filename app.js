const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const filtersRouter = require("./routes/filtersRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const drinksRouter = require("./routes/drinksRouter");
require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/filters", filtersRouter);
app.use("/drinks", drinksRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((req, res) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

module.exports = app;
