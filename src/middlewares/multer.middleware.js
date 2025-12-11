import multer from "multer";
import { nanoid } from "nanoid";

//diskStorage tells Multer to store the file on disk (your server) temporarily.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = nanoid(6);
    cb(null, file.fieldname + "-" + uniqueSuffix); //Prevents overwriting files with the same name.
  },
});

const upload = multer({ storage: storage }); //Create the Multer instance , This upload object has methods like: .single("fieldname")

export default upload;
