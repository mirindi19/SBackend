const  mongoose = require('mongoose');
const TeacherSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        min:2,
        max:20,
      //unique:false
    },
    telephone:{
        type:String,
        required:true,
        unique:true
    }, 
},
{timestamps:true}
);
module.exports=mongoose.model("Teacher",TeacherSchema);