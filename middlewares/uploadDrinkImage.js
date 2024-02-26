const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "drink",
		allowed_formats: ["jpeg", "png", "jpg"],
		transformation: [{ width: 400, height: 400, crop: "limit" }],
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new Error("File is not an image"), false);
	}
};

const uploadDrinkImage = multer({ storage, fileFilter });

module.exports = uploadDrinkImage;
