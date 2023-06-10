const express = require("express");
const classController=require("../controllers/classController");
const router=express.Router()
router.post('/',classController.addClass)
router.get('/',classController.getClasses)
module.exports =router