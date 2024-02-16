const multer = require("multer");
const path = require("path");

// import multer from "multer";
// import path from "path";

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
});

const storage = multer({ storage: multerConfig });
module.exports = storage;
