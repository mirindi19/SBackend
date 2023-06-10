const  mongoose = require('mongoose');
const ParentSchema= new mongoose.Schema({
    fatherName:{
        type:String,
        min:2,
        max:30,
      //unique:false
    },
    motherName:{
        type:String,
        min:2,
        max:30,
      //unique:false
    },
    telephone:{
         type:String,
        required:true,
        unique:true,
        // default:[],

    }, 
},
{timestamps:true}
);
module.exports=mongoose.model("Parent",ParentSchema);