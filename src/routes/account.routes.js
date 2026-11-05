const express=require("express")
const router=express.Router()
const Authmiddleware=require("../middleware/auth.middleware")
router.post("/",Authmiddleware.Authmiddleware)





module.exports=router