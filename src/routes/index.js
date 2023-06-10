const express = require("express");
const userRoute=require("./user.routes.js")
const authRoute=require("./auth.routes.js")
const teacherRoute=require('./teacher.routes');
const classRoute=require('./class.routes');
const parentRoute=require('./parent.routes');
const messageRoute=require('./message.routes');
const studentRoute=require('./student.routes');
const attendanceRoute=require('./attendance.routes');
const subjectRoute=require('./subject.routes');
const router=express.Router()

router.use('/api/authentication',authRoute)
router.use('/api/users',userRoute)
router.use('/api/teachers',teacherRoute)
router.use('/api/classes',classRoute)
router.use('/api/parents',parentRoute)
router.use('/api/messages',messageRoute)
router.use('/api/students',studentRoute)
router.use('/api/attendances',attendanceRoute);
router.use('/api/subjects',subjectRoute);
router.use('/public/uploads',express.static("src/public/uploads"))
module.exports =router