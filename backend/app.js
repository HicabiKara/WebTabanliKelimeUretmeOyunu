const express=require('express')
const cors=require("cors")
const dotenv=require("dotenv")
const db=require("./config/database.js")
const auth=require("./routes/auth.js")
const game=require ("./routes/game.js")


dotenv.config()


const app=express()

app.use(cors()) 
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use("/",auth)
app.use("/",game)


const PORT=process.env.PORT || 5000

db()

app.get("/",(req,res)=>{
    res.json({message:"deneme"})
})

app.listen(PORT,()=>{
    console.log(`server listenin on port ${PORT}`);
})
