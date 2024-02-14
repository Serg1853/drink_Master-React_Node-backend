import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./routes/usersRouter.js";

dotenv.config();
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((req, res) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
