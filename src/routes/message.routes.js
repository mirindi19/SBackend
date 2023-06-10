const express = require("express");
const messageController=require("../controllers/messageController");
const verifyToken = require("../middlewares/verifyToken");
const router=express.Router()
router.post('/send-message-parent',verifyToken,messageController.sendMessageToParent)
router.post('/send-message-teacher',verifyToken,messageController.sendMessageToTeacher)
router.get('/message-sentby-parent-teacher',verifyToken,messageController.getSentMessagesByParentToTeacher)
router.get('/message-sentby-teacher-parent',verifyToken,messageController.getSentMessagesByTeacherToParent)

router.get('/message-sentby-parent-teacher-parentside',verifyToken,messageController.getSentMessagesByParentToTeacherOnParentSide)
router.get('/message-sentby-teacher-parent-parentside',verifyToken,messageController.getSentMessagesByTeacherToParentParentSide)
module.exports =router