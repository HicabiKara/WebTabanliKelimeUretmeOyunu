const mongoose=require("mongoose")

const gameSchema=mongoose.Schema({
    username:String,
    totalScore:Number,
    totalWordsFound:Number,
    playDate:{
        type:Date,
        default:Date.now
    },
    foundWords:[String],
})

const game=mongoose.model("game",gameSchema);

module.exports=game;