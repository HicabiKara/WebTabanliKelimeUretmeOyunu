const mongoose=require("mongoose")

const db=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Mongo db bağlantısı başarılı")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports=db;