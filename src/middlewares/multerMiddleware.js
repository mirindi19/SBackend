const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const videoFilter = (req, file, cb) => {
    const allowedFileTypes = [ "video/mp4",'video/mkv'];
    // if (file.mimetype === "video/mp4" || file.mimetype === "video/mkv") {
    //     cb(null, path.join(__dirname, "../files"));
    //   } else {
    //     cb({ message: "This file is not in video format." }, false);
    //   }
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb({ message: "This file is not in video format." }, false);
    }
  };

const uploadMiddleware = multer({ storage, fileFilter });




module.exports = uploadMiddleware;