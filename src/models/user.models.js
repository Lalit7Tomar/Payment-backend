const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userschema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exist"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[A-Za-z]{2,}$/,"Invalid email address"]
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"password should be contain more than 6 characters"],
        select:false
    },
},{
    timestamps:true
})
userschema.pre("save",async function (next){
  if(!this.isModified("password")) return;
  const hash= await bcrypt.hash(this.password,10)
  this.password=hash
})
userschema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)

    
}
const usermodel=mongoose.model("usermodel",userschema)
module.exports=usermodel