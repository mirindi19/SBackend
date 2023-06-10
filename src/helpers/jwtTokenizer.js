const jwt =require('jsonwebtoken');
const dotenv =require("dotenv");
dotenv.config();

 const encode = (claims)=>{
    const token= jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: "7d"});
    return token;
};

 const decode=(token)=>{
    const payload=jwt.verify(token, process.env.JWT_SECRET)
    return payload;
}
module.exports ={encode,decode}