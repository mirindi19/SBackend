const {decode, encode} =require('../helpers/jwtTokenizer')
const User=require("../models/User");
const dotenv=require('dotenv')
const bcrypt=require('bcrypt')
dotenv.config();


class userController{
  
    static async signUp(req, res) {
      const {telephone,email,password}=req.body
      try {
         const checkTeacher=await User.findOne({teacherId:telephone});
         const checkParent=await User.findOne({parentId:telephone});
         const checkEmail=await  User.findOne({email:email})
          const salt = await bcrypt.genSaltSync(10);
          const hashedPassword = await bcrypt.hashSync(password, salt);
         if(checkEmail){
             return res.status(200).json({
                 statusCode: 400,
                 message: "The below email is already exist",
               });  
         }
         else{
             if(checkTeacher){
               await User.updateOne(
                  {"teacherId":telephone},
                  {$set: { email:email,password:hashedPassword }}); 
               return res.status(200).json({
                 statusCode: 200,
                 status:"SUCCESS",
                 message: "Account have been Successfull created",
                
               });
             }else if(checkParent){
             await User.updateOne(
                  {"parentId":telephone},
                  {$set: { email:email,password:hashedPassword }}); 
               return res.status(200).json({
                 statusCode: 200,
                 status:"SUCCESS",
                 message: "Account have been Successfull created",
           
               });
             }
             else{
               return res.status(200).json({
                  statusCode: 400,
                  message: "The Phone number bellow doesn't exist",
                });  
             }
         }
         
     } catch (error) {
         return res.status(500).json({
             statusCode: 500,
             status:"FAILED",
             message: error.message,
           });  
     }
     }

     static async signIn(req, res) {
      try {
        const { email, password } = req.body;
        const checkUser=await User.findOne({email:email})
        if (!checkUser) {
          return res.status(404).json({
            statusCode: 404,
            message: "Email doesn't exist",
          });
        }
        const dbEmail = checkUser.email;
        const dbPasword = checkUser.password;
        const telephone = checkUser.telephone;
        const role = checkUser.role;
        const parentId=checkUser.parentId
        const teacherId=checkUser.teacherId
        const decreptedPassword = await bcrypt.compare(password, dbPasword);
          if (dbEmail === email) {
            if (decreptedPassword) {
              const token = await encode({
                email,
                telephone,
                role,
                teacherId,
                parentId
              });
              //const decodedToken = await decode(token);
              return res.status(200).json({
               statusCode: 200,
               status:"SUCCESS",
                message: "Successfull logged",
                data:{
                  role,
                  email,
                  teacherId,
                  parentId,
                  token
               },
              });
            }
          }
          return res.status(200).json({
            statusCode: 400,
            status:"FAILED",
            message: "Password is not correct",
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
module.exports =userController