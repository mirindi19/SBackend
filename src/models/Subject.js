const  mongoose = require('mongoose');
const SubjectSchema= new mongoose.Schema({
    subjectName:{
        type:String,
        min:2,
        max:20,
    },
  description:{
        type:String,
        min:2,
        max:80,
    },
    teacherId:{
        type:String,
        min:2,
    },
    videoUrl:{
      type:String,
      min:2,
  },
  fileUrl:{
    type:String,
    min:2,
},
},
{timestamps:true}
);
module.exports=mongoose.model("Subject",SubjectSchema);