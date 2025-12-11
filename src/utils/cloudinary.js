import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

//This links your server to your Cloudinary account.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Accepts localFilePath — the temporary file saved by Multer.
const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Uploading file to Cloudinary:", localFilePath);

    if (!localFilePath) return; //return : undefined is returned which is captured in upload.controllers.js as falsy value

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "file_upload", //uploaded file goes inside this Cloudinary folder
      type: "upload", //tells Cloudinary this is a normal upload
    }); //response contains: secure_url (public URL) , public_id , file size , file format etc.

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
