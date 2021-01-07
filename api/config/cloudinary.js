var cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.v2.config({
  cloudinary_name: process.env.cloudinary_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
