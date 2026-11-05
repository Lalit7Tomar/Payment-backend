const mongoose=require("mongoose")
const accountSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Account must be associated with a user"],
        index:true
    },
    status:{
        enum:{
            values: ["ACTIVE","FROZEN","CLOSED"],
            message:"Status can be active,frozen or closed",
            default:"ACTIVE"
        }
    },
    currency:{
        Type:String,
        required:[true,"CAurrency is required for creating an account"],
        default:"INR"
    }
},{
    timestamps:true
})
accountSchema.index({user:1,status:1})
const accountmodel=new mongoose.model("accountmodel",accountSchema)
module.exports=accountmodel