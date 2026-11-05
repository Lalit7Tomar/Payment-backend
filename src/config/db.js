const mongoose=require('mongoose')
function connecttoDB(){
    if(!process.env.MONGO_URI){
        console.log("plz provide mongodb uri")
    }
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database is connected")
    }).catch((err)=>{
        console.log("Database connection failed");
        process.exit(1)
    })
}
module.exports =connecttoDB