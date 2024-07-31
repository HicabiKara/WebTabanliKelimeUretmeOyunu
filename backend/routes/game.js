const express =require("express")
const {saveGameData, getGameData,getGameDataByUsername}=require("../controllers/game.js")
const router=express.Router()


router.post("/saveGameData",saveGameData)
router.get("/getGameData",getGameData)
router.get("/getGameData/:username",getGameDataByUsername)


module.exports=router;