const express = require("express");
const subjectController=require("../controllers/subjectController");
const verifyToken = require("../middlewares/verifyToken");
const uploadMiddleware=require("../middlewares/multerMiddleware")
const uploads=require("../middlewares/uploads")
const uploadVideo=require("../middlewares/uploadsVideo")
const router=express.Router()
router.post('/',verifyToken ,subjectController.addSubject);
router.put('/update-video/:id',verifyToken ,uploadVideo.single("video"),subjectController.uploadVideo);
router.put('/update-file/:id',verifyToken ,uploads.single("file"),subjectController.uploadFile);
router.get('/download-file/:id' ,subjectController.downloadFile);
router.get('/',subjectController.getSubjects);
router.get('/subjects-byteacherid',verifyToken ,subjectController.getSubjectsByTeacherId);
module.exports =router