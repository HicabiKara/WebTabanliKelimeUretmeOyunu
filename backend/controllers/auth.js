const Auth = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const Game=require("../models/game.js")

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Bu kullanıcı adı kullanılmaktadır" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Parolanız 6 karakterden küçük olmamalı" });
    }
    if (username.length < 7) {
      return res
        .status(400)
        .json({ message: "Kullanıcı adınız 7 karakterden küçük olmamalı" });
    }
    
    const newUser = await Auth.create({ username, password });
    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Böyle bir kullanıcı bulunamadı" });
    }
    
    if (user.password!==password) {
      return res.status(401).json({ message: "Parolanız yanlış" });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(200).json({
      status: "OK",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const {username,password}=req.body;
    const existingUser= await Auth.findById(id)
    const oldUsername=existingUser.username;


    const updatedAccount = await Auth.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if(updatedAccount){
      await Game.updateMany(
        {username:oldUsername},
        {$set:{username:username}}  
      )
    }
    res.status(200).json({ message: "Güncelleme işlemi başarılı",updatedAccount });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccount= async (req,res)=>{
  try {
    const {id}=req.params;
    const deletedUser=  await Auth.findByIdAndDelete(id);
   if (!deletedUser) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }
    await Game.deleteMany({username:deletedUser.username})
    res.status(200).json({message:"Hesap silme işlemi başarıyla tamamlandı"})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Auth.findOne({ username: username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { register, login,updateAccount,deleteAccount,getUserByUsername };
