const express = require("express");
const studentController=require("../controllers/studentController");
const verifyToken = require("../middlewares/verifyToken");
const router=express.Router()
router.post('/',studentController.addStudent)
router.get('/',studentController.getStudents)
router.get('/students-classe', verifyToken,studentController.getStudentsByClassId)
router.get('/students-parcentage', studentController.getStudentsParcentage)
router.get('/students-parcentage-byteacherId',verifyToken, studentController.getStudentsParcentageByTeacherId)

module.exports =router