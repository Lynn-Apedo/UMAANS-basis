const multer = require("multer");
const moment = require("moment");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload");
  },
  filename: (req, file, callback) => {
    if (file == null || file == undefined || file == "") {
      req.body.mainPicture = "http://localhost:2088/static/neo.png";
      callback(null, "upload");
    }
    const [name] = file.originalname
      .replace(" ", "-")
      .substring(0, 19)
      .split(".");
    const date = moment().format("YYYY-MM-DD-HHmmss");
    const extension = MIME_TYPES[file.mimetype];

    req.body.mainPicture = `http://localhost:2088/static/${date}_${name}.${extension}`;	
    callback(null, `${date}_${name}.${extension}`);
  },
});

module.exports = multer({ storage }).single("mainPicture");