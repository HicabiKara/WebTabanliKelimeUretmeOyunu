const express=require("express")
const {register,login,updateAccount, deleteAccount, getUserByUsername}=require("../controllers/auth.js")


const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.patch("/updateAccount/:id",updateAccount)
router.delete("/deleteAccount/:id",deleteAccount)
router.get("/getUserByUsername/:username", getUserByUsername)
module.exports=router;