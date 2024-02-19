const fs = require("fs/promises");
const path = require("path");

const glassesPath = path.join(__dirname, "glasses.json");

const getGlasses = async () => {
	const data = await fs.readFile(glassesPath);
	return JSON.parse(data);
};

module.exports = {
	getGlasses,
};
