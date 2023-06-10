const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
});  

let upload = multer({ 
    storage: storage,
     limits : {fileSize : 6000000
    }});

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

    const uploadMiddleware = multer({ storage , videoFilter });




module.exports = uploadMiddleware;