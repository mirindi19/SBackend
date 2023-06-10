const  mongoose = require('mongoose');
const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        max:30,
        unique:false
    },
    password:{
        type:String,
        
    }, 
    isActive:{
        type:Boolean,
        required:true,
    },
    role:{
        type:String,
        required:true,
    }, 
    parentId:{
        type:String,
    }, 
    teacherId:{
        type:String,
    }, 
    resetLink:{
        type:String, 
    } 
},
{timestamps:true}
);
module.exports=mongoose.model("User",UserSchema);