/*
account creatiion
account frozen
account termination



/*
db.createCollection("nonfiction",{validator:{ $jsonSchema:{ required:["name","price"],properties:{name:{bsontype:'String'},age:{bsontype:'number'}}}})
  db.createCollection("nonfiction",{
   validator:{
    $jsonSchema:{
    required:["name","price"],
    properties:{
     name:{
      bsontype:'String'
     },
     age:{
      bsontype:'number'
     }
    
    }
}}})
  






))
















*/

const accountmodel=require("../models/account.model")
async function accountcreation(req,res){
    const user=req.user;
    const account =await usermodel.create({
        user:user._id
    })
    res.status(201).json({
       account 

    })
}