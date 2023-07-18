const jwt= require("jsonwebtoken");
const gerenateToken =(id)=>{
    return jwt.sign({id},"ravitomer",{
        expiresIn:'30d' ,
       })
};
module.exports=gerenateToken;
