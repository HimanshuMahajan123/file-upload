import express from "express";
import uploadRoute from "./routes/upload.routes.js";
import upload from "./middlewares/multer.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/upload", upload.single("photo"), uploadRoute);

export default app;
