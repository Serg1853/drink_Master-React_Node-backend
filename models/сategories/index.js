const fs = require("fs/promises");
const path = require("path");

const categoriesPath = path.join(__dirname, "categories.json");

const getCategories = async () => {
	const data = await fs.readFile(categoriesPath);
	let categories = JSON.parse(data);
	categories.sort((a, b) => a.name.localeCompare(b.name));
	return categories;
};

module.exports = {
	getCategories,
};
