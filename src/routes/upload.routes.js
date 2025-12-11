import { uploadFile } from "../controllers/upload.controllers.js";
import { Router } from "express";

const router = Router();

router.route("/").post(uploadFile);

export default router;
