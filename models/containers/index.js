const fs = require("fs/promises");
const path = require("path");

const containersPath = path.join(__dirname, "containers.json");

const getContainers = async () => {
	const data = await fs.readFile(containersPath);
	return JSON.parse(data);
};

module.exports = {
	getContainers,
};
