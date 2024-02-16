const app = require("./app");
require("dotenv").config();
const { connectDb } = require("./helpers");

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {});
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
