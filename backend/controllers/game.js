const Game = require("../models/game.js");

const saveGameData = async (req, res) => {
  try {
    const { username, totalScore, totalWordsFound, foundWords } = req.body;
    const gameData = await Game.create({
      username,
      totalScore,
      totalWordsFound,
      foundWords,
    });
    res.status(201).json({
      status: "OK",
      gameData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getGameData = async (req, res) => {
  try {
    const highestScores = await Game.aggregate([
      {
        $sort: { totalScore: -1, totalWordsFound: -1 } // ilk sıralama parametresi puan, ardından kelime sayısı(eğer puanlar aynı olursa fazla sayıda kelime olan sıralamaya girer)
      },
      {
        $group: {
          _id: "$username",
          highestScore: { $first: "$totalScore" },
          data: { $first: "$$ROOT" }, // En yüksek skora ve kelime sayısına sahip olan veriyi alıyoruz
        },
      },
      { $sort: { highestScore: -1 } }, // elimize geçen verilerin en yüksek skora göre sıralı gelmesi için 
    ]);
    res.status(200).json(highestScores);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getGameDataByUsername  =  async(req,res)=>{
  try {
      const {username}=req.params
      const userGameData= await Game.find({username})
      res.status(200).json({userGameData})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}



module.exports = { saveGameData, getGameData,getGameDataByUsername };
