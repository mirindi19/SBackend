const { model } = require("mongoose");
const Teacher=require("../models/Teacher");
const User=require("../models/User");
class teacherController{
    static async addTeacher(req, res) {
        const {telephone,fullName}=req.body
        try {
            const checkPhoneNumber=await Teacher.findOne({telephone:telephone});
            if(checkPhoneNumber){
                return res.status(200).json({
                    statusCode: 400,
                    message: "The below Phone number is already exist",
                  });  
            }else{
                const data= await Teacher.create({
                    telephone,
                    fullName
                  }); 
                  const teachId=data.telephone
                  const dataUser= await User.create({
                    email:null,
                    password:null,
                    isActive:true,
                    role:"Teacher",
                    teacherId:teachId,
                    parentId:null,
                    resetLink:null
                  }); 

                  return res.status(200).json({
                    statusCode: 200,
                    status:"SUCCESS",
                    message: "Account Created Successfully"
                  });

            }
            
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                status:"FAILED",
                message: error.message,
              });  
        }
    }
    static async getTeachers(req, res) {
      try {
              const data= await Teacher.find(); 
                return res.status(200).json({
                  statusCode: 200,
                  status:"SUCCESS",
                  data: data,
                });
      
      } catch (error) {
          return res.status(500).json({
              statusCode: 500,
              status:"FAILED",
              message: error.message,
            });  
      }
 
  }

}
module.exports =teacherController