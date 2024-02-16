const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
});

const storage = multer({ storage: multerConfig });
module.exports = storage;
