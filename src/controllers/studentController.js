const Student=require("../models/Student");
const Classe=require("../models/Classe");
const Parent=require("../models/Parent");
const generateRegNumber = require("../helpers/regNumberGenerator");
const { decode } = require("../helpers/jwtTokenizer");
class StudentController{
    static async addStudent(req, res) {
        const { firstName,lastName,dob,parentId,classId,gender}=req.body
        const name={firstName,lastName}
        const AllStudent = await Student.count();
        const rndInt = ("00" + AllStudent).slice(-3)
        const regNumber= generateRegNumber(name,rndInt)
        try {
            const checkParent=await Parent.findOne({telephone:parentId});
            const checkClass=await Classe.findOne({_id:classId});
            if(!checkClass){
                return res.status(200).json({
                    statusCode: 400,
                    message: "The below Classe below doesn't exist",
                  });  
            }
           else if(!checkParent){
                return res.status(200).json({
                    statusCode: 400,
                    message: "The parent below doesn't exist",
                  });  
            }
            else{
                const data= await Student.create({
                   firstName,
                   lastName,
                   parentId,
                   classId,
                   dob,
                   regNumber,
                   gender
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
    static async getStudents(req, res) {
      try {
              const data= await Student.find(); 
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
  static async getStudentsByClassId(req, res) {
    const token = req.headers["token"];
    const Token = await decode(token);
    const teacherId=Token.teacherId
    const findClass=await Classe.findOne({teacherId:teacherId})
    const classId=findClass._id
    try {
            const data= await Student.find({classId:classId}); 
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

static async getStudentsParcentage(req, res) {
  // const token = req.headers["token"];
  // const Token = await decode(token);
  // const teacherId=Token.teacherId
  // const findClass=await Classe.findOne({teacherId:teacherId})
  // const classId=findClass._id
  try {
          const data= await Student.aggregate([
            {$group: {
              _id:'$gender',
              myCount: { $sum: 1}, 
              // game_total_profit: { $sum: '$game_profit'}
            }},
          // {$count: ""}
           // { $project: { _id: 0 } }
          
          ])
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

static async getStudentsParcentageByTeacherId(req, res) {
  const token = req.headers["token"];
  const Token = await decode(token);
  const teacherId=Token.teacherId
  const findClass=await Classe.findOne({teacherId:teacherId})
  const classId=findClass._id.toString() 
  

  const students=await Student.find({classId})
  console.log("classId",students)
  try {
          const data= await students.aggregate([
            {$group: {
              _id:'$gender',
              myCount: { $sum: 1}, 
              
              // game_total_profit: { $sum: '$game_profit'}
            }},
            {   $match:  {classId:classId } }
           //{ $cond:{"$classId":classId}}
          // {$count: ""}
        
          
          ])
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
module.exports =StudentController