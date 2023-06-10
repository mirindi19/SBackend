const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + "--" + file.originalname);
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    }
});  

let upload = multer({ 
    storage: storage,
     limits : {fileSize : 6000000
    }});

    const fileFilter = (req, file, cb) => {
        if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg') || (file.mimetype).includes('pdf')){
            cb(null, true);
        } else{
            cb(null, false);
        }
    };

    const uploadMiddleware = multer({ storage , fileFilter });




module.exports = uploadMiddleware;