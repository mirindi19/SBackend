const express = require("express");
const attendanceController=require("../controllers/attendanceController");
const verifyToken = require("../middlewares/verifyToken");
const router=express.Router()
router.post('/',attendanceController.addAttendance)
router.get('/by-class',verifyToken,attendanceController.getAttendanceList)
router.get('/',attendanceController.getAttendance)
module.exports =router