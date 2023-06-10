const { model } = require("mongoose");
const { decode } = require("../helpers/jwtTokenizer");
const Subject=require("../models/Subject");
const Teacher=require("../models/Teacher");

const path=require('path')
class subjectController{
    static async addSubject(req, res) {
         const {subjectName,description}=req.body
        const token = req.headers["token"];
        const decodedToken = await decode(token);
        const teacherId=decodedToken.teacherId
      //  const fileUrl = req.file.filename;
      //  const videoUrl=req.file.filename;
      
        try {
            const checkTeacherId=await Teacher.findOne({telephone:teacherId});
            if(!checkTeacherId){
                return res.status(200).json({
                    statusCode: 400,
                    message: "The teacher with below phone number doesn't exist",
                  });  
            }
        
            else{
            
                const data= await Subject.create({
                    subjectName,
                    description,
                    videoUrl:null,
                    fileUrl:null,
                    teacherId,
                  
                  }); 
                  return res.status(200).json({
                    statusCode: 200,
                    status:"SUCCESS",
                    message: "Successfull created",
                    data: data,
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


    static async uploadFile(req, res) {
      const subjectId=req.params.id;
     const token = req.headers["token"];
     const decodedToken = await decode(token);
     const fileUrl = req.file.filename;

     try {
         const checkSubject=await Subject.findOne({_id:subjectId});
         if(!checkSubject){
             return res.status(200).json({
                 statusCode: 404,
                 message: "Subject not found",
               });  
         }
     
         else{
         const data= await Subject.updateOne({"_id":subjectId},{$set: {fileUrl: fileUrl}});
           
               return res.status(200).json({
                 statusCode: 200,
                 status:"SUCCESS",
                 message: "Successfull ",
                 data: data,
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
  static async uploadVideo(req, res) {
      const subjectId=req.params.id;
     const token = req.headers["token"];
     const decodedToken = await decode(token);
     const videoUrl = req.file.filename;
     try {
         const checkSubject=await Subject.findOne({_id:subjectId});
         if(!checkSubject){
             return res.status(200).json({
                 statusCode: 404,
                 message: "Subject not found",
               });  
         }
         else{
         const data= await Subject.updateOne({"_id":subjectId},{$set: {videoUrl: videoUrl}});
               return res.status(200).json({
                 statusCode: 200,
                 status:"SUCCESS",
                 message: "Successfull ",
                 data: data,
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

 static async downloadFile(req, res) {
  const fileUrlId=req.params.id;
 try {
      let fileLocation=path.join('public/uploads',fileUrlId)
      return  res.download(fileLocation,fileUrlId)
     
 } catch (error) {
     return res.status(500).json({
         statusCode: 500,
         status:"FAILED",
         message: error.message,
       });  
 }

}


    static async getSubjects(req, res) {
        try {
                const data= await Subject.find(); 
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
    static async getSubjectsByTeacherId(req, res) {
        const token = req.headers["token"];
        const decodedToken = await decode(token);
        const teacherId=decodedToken.teacherId
        try {
                const data= await Subject.find({teacherId:teacherId}); 
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
module.exports =subjectController