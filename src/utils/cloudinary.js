import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Uploading file to Cloudinary:", localFilePath);
    if (!localFilePath) return;
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "file_upload",
      type: "upload",
    });

    //now the file is uploaded to cloudinary
    console.log(
      "File uploaded to Cloudinary successfully:",
      response.secure_url
    );
    return response.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    fs.unlinkSync(localFilePath); //remove the locally saved temporay file in case of error
    return null;
  }
};

export { uploadOnCloudinary };
