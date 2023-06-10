
const User=require("../models/User");
const users=require("../data/userData");
class userController{
    static async createUser(req, res) {
        try {
            let email=users.map((p)=>p.email)
            const findUser=await User.findOne({email})
            if(findUser){
                return res.status(200).json({
                    statusCode: 400,
                    status:"FAILED",
                    message: "Email already in use."
                 
                  });  
            }
            const importUser=await User.insertMany(users)
            return res.status(200).json({
                statusCode: 200,
                status:"SUCCESS",
                message: "Successfull created",
                data:importUser,
              });

            
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                status:"FAILED",
                message: error.message,
              });     
        }
      
    }
    static async getUsers(req, res) {
        try {
                const data= await User.find(); 
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
module.exports =userController


