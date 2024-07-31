const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },
    registerDate:{
        type:Date,
        default:Date.now,
    }
    
})


module.exports=mongoose.model("users",userSchema)