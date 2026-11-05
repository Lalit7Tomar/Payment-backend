const usermodel=require("../models/user.models")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const emailService=require('../services/email.services')
async function userRegistrationController(req,res){
    const {email,name,password}=req.body;
    const isExists=await usermodel.findOne({
        email:email
    })
    if(isExists){
        return res.status(402).json({
            status:"Failed",
            message:"User already exists with this accout"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const User=await usermodel.create({
        email:req.body.email,name:req.body.name,password:hashedPassword
    })
    const token=jwt.sign({UserId:User._id},process.env.JWT_SECRET,{expiresIn:3*24*60*60})
    res.cookie("token",token)
    res.status(201).json({
        "message":"User created",
         usermodel:{
            _id:User._id,
            email:User.email,
            name:User.name
         },
         token

    }
     
    )
    await emailService.sendRegistrationEmail(User.email,User.name);
}
async function userLoginController(req,res){
  const {email,password}=req.body;
  const user=await usermodel.findOne({email:email}).select("+password")
  if(!user){
    return res.status(401).json({
        message:"combination of email and password is incorrect"
    })
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
);
if (!isPasswordCorrect) {
    return res.status(401).json({
        message: "Invalid email or password"
    });
}
   const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:3*24*60*60})
    res.cookie("token",token)
    res.status(201).json({
        message:"User found",
         user:{
            _id:user._id,
            email:user.email,
            password:user.password
         },
         token

    }
    )
}
module.exports={
    userRegistrationController,
    userLoginController
}