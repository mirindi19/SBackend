const bcrypt=require("bcrypt")

const users=[
    {
        role:"Admin",
        email:"admin@gmail.com",
        password:bcrypt.hashSync("password",10),
        isActive:true,
        parentId:null,
        teacherId:null,
        resetLink:null
    },
]
module.exports=users