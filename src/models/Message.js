const  mongoose = require('mongoose');
const MessageSchema= new mongoose.Schema({
    message:{
        type:String,
        min:2,
        max:100
    },
    teacherId:{
        type:String,
        min:2,
        max:20
    },
    parentId:{
      type:String,
      min:2,
  },
  isTeacher:{
    type:Boolean,
    default:false,
},
},
{timestamps:true}
);
module.exports=mongoose.model("Message",MessageSchema);