const express = require("express");
const teacherController=require("../controllers/teacherController");
const router=express.Router()
router.post('/',teacherController.addTeacher)
router.get('/',teacherController.getTeachers)
module.exports =router