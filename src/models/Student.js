const  mongoose = require('mongoose');
const StudentSchema= new mongoose.Schema({
    firstName:{
        type:String,
        min:2,
        max:30,
      //unique:false
    },
    lastName:{
        type:String,
        min:2,
        max:30,
      //unique:false
    },
    regNumber:{
        type:String,
       required:true,
       unique:true
   }, 
   gender:{
    type:String,
   required:true
    }, 
    dob:{
        type:Date,
       required:true,
       // default:[],
   }, 
    parentId:{
         type:String,
        required:true,
        // default:[],
    }, 
classId:{
    type:String,
    required:true
}
},
{timestamps:true}
);
module.exports=mongoose.model("Student",StudentSchema);