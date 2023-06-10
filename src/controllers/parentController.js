const { model } = require("mongoose");
const Parent=require("../models/Parent");
const User=require("../models/User");
class parentController{
    static async addParent(req, res) {
        const {  fatherName, motherName,telephone,email}=req.body
        try {
            const checkPhoneNumber=await Parent.findOne({telephone:telephone});
            const checkEmail=await User.findOne({email:email});
            if(checkPhoneNumber){
                return res.status(200).json({
                    statusCode: 400,
                    message: "The below Phone number is already exist",
                  });  
            }
            else{
                const data= await Parent.create({
                    telephone,
                    fatherName,
                    motherName
                  }); 
                  const parentId=data.telephone
                  const dataUser= await User.create({
                    email:null,
                    password:null,
                    isActive:true,
                    role:"Parent",
                    teacherId:null,
                    parentId:parentId,
                    resetLink:null
                  }); 
                  return res.status(200).json({
                    statusCode: 200,
                    status:"SUCCESS",
                    message: "Successfull created",
                    data: {data,dataUser},
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
    static async getParents(req, res) {
      try {
              const data= await Parent.find(); 
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
module.exports =parentController