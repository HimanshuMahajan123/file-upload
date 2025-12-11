import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  console.log("Uploaded file info:", req.file); //multer middleware adds the file info to req.file
  const localFilePath = req.file.path;

  const cloudinaryUrl = await uploadOnCloudinary(localFilePath);
  if (!cloudinaryUrl) {
    throw new ApiError(500, "File upload to Cloudinary failed");
  }

  fs.unlinkSync(localFilePath); //remove the locally saved temporary file after successful upload to Cloudinary

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { fileUrl: cloudinaryUrl },
        "File uploaded successfully to Cloudinary"
      )
    );
});

export { uploadFile };
