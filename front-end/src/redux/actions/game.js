import { showGameResult, showModal } from "./modal";
import axios from "axios";
export const createLetters = (dispatch) => {
  const vowels = ["a", "e", "ı", "i", "o", "u"];
  const consonants = [
    "b",
    "c",
    "ç",
    "d",
    "f",
    "g",
    "h",
    "k",
    "l",
    "m",
    "n",
    "p",
    "r",
    "s",
    "t",
    "v",
    "y",
    "z",
  ];
  const selectedVowels = [];
  const selectedConsonants = [];

  //Harf Listelerinin kopyalarını oluşturuyoruz
  const availableVowels = vowels.slice();
  const availableConsonants = consonants.slice();

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * availableVowels.length);
    selectedVowels.push(availableVowels[randomIndex]);
    availableVowels.splice(randomIndex, 1);
  }
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * availableConsonants.length);
    selectedConsonants.push(availableConsonants[randomIndex]);
    availableConsonants.splice(randomIndex, 1);
  }
  const randomLetters = [...selectedVowels, ...selectedConsonants];

  dispatch({
    type: "SET_LETTERS",
    payload: randomLetters,
  });
};

export const loadWords = (wordsList) => {
  return {
    type: "LOAD_WORDS",
    payload: wordsList,
  };
};

export const checkWord = (newWord) => (dispatch, getState) => {
  const allLetters = [
    "a",
    "e",
    "ı",
    "i",
    "o",
    "u",
    "b",
    "c",
    "ç",
    "d",
    "f",
    "g",
    "h",
    "k",
    "l",
    "m",
    "n",
    "p",
    "r",
    "s",
    "t",
    "v",
    "y",
    "z",
  ];

  const words = getState().game.words;
  const foundedWords = getState().game.foundWords;
  const letters = getState().game.letters;
  const difLettersArray = allLetters.filter(function (item) {
    //Altıgen içindeki harflerin dışında kalan harfler dizisi
    return letters.indexOf(item) === -1;
  });
  const defaultPoint = 6;
  const wordPoint = defaultPoint + (newWord.length - 4) * 3;
  const isWordValid = words.has(newWord);
  const isCenterLetterValid = newWord.includes(letters?.[2]);
  if (isWordValid) {
    for (let i = 0; i < newWord.length; i++) {
      if (difLettersArray.includes(newWord[i])) {
        dispatch(
          showModal(
            "Uyarı",
            "Lütfen Sadece Altıgen İçlerindeki Harfleri Kullanın"
          )
        );
        return;
      }
    }
    if (!isCenterLetterValid) {
      dispatch(showModal("Uyarı", "Merkez Altıgendeki Harf Olmak Zorunda"));
      return;
    } else if (newWord.length < 4) {
      dispatch(showModal("Uyarı", "Kelimeniz en az 4 Harfli Olmak Zorunda"));
      return;
    } else if (foundedWords.includes(newWord)) {
      dispatch(
        showModal("Uyarı", "Bu Kelime Daha Önce Bulundu Tekrar Oluşturulamaz")
      );
      return;
    }
    dispatch({
      type: "UPDATE_GAME_STATS",
      payload: { newWord, wordPoint },
    });
  } else {
    dispatch(showModal("Uyarı", "Geçersiz Kelime"));
  }
};

export const saveGameData = (gameData, isOnlineGame) => async (dispatch) => {
  try {
    if (isOnlineGame) {
      //verileri veritabanına kaydetme işlemleri
      await axios.post("http://localhost:5000/saveGameData", gameData);
      dispatch({ type: "FINISH_GAME" });
      setTimeout(() => {
        dispatch(
          showGameResult(
            "Oyun Sonu Verileri",
            gameData?.totalScore,
            gameData?.foundWords
          )
        );
      }, 250);
    } else {
      dispatch({ type: "FINISH_GAME" });
      setTimeout(() => {
        dispatch(
          showGameResult(
            "Oyun Sonu Verileri",
            gameData?.totalScore,
            gameData?.foundWords
          )
        );
      }, 250);
    }
  } catch (error) {
    console.error("Save game data error:", error);
  }
};

export const getGameData = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:5000/getGameData");
    dispatch({ type: "LOAD_GAME_DATAS", payload: data });
  } catch (error) {
    throw new Error("Veriler alınırken bir hata oluştu", error);
  }
};

export const getGameDataByUsername=(username)=> async(dispatch)=>{
  try {
    const userGameDatas=await axios.get(`http://localhost:5000/getGameData/${username}`)
    dispatch({type:"LOAD_USER_GAME_DATAS",payload:userGameDatas})
  } catch (error) {
    throw new Error("Veriler alınırken bir hata oluştu",error)
  }
}


export const activateExtraTime = () => ({
  type: "ACTIVATE_EXTRA_TIME",
});

export const addRandomWord = (word, wordPoint) => ({
  type: "ADD_RANDOM_WORD",
  payload: { word, wordPoint },
});

export const activateDoublePoints = () => ({
  type: "ACTIVATE_DOUBLE_POINTS",
});