import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateExtraTime,
  addRandomWord,
  activateDoublePoints,
} from "../redux/actions/game";
import { MdAccessTimeFilled } from "react-icons/md";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { GiTwoCoins } from "react-icons/gi";
import { WordContext } from "../contexts/WordContext";

const Extras = () => {
  const [showDescriptions, setShowDescriptions] = useState({
    extraTime: false,
    extraWord: false,
    doublePoints: false,
  });
  const dispatch = useDispatch();
  const {
    extraTimeUsed,
    extraWordUsed,
    doublePointsUsed,
    foundWords,
    isDoublePointsActive,
  } = useSelector((state) => state.game);
  const words = Array.from(useContext(WordContext));

  const handleExtraTime = () => {
    if (!extraTimeUsed) {
      dispatch(activateExtraTime());
    }
  };

  const handleAddRandomWord = () => {
    if (!extraWordUsed) {
      setShowDescriptions({ ...showDescriptions, extraWord: true });
      const filteredWords = words.filter(
        (word) => word.length === 7 || word.length === 8
      );
      let randomWord =
        filteredWords[Math.floor(Math.random() * filteredWords.length)];
      while (foundWords.includes(randomWord)) {
        randomWord =
          filteredWords[Math.floor(Math.random() * filteredWords.length)];
      }
      const wordPoint = 6 + (randomWord.length - 4) * 3;
      const finalPoint = isDoublePointsActive ? wordPoint * 2 : wordPoint;
      dispatch(addRandomWord(randomWord, finalPoint));
    }
  };

  const handleDoublePoints = () => {
    if (!doublePointsUsed) {
      setShowDescriptions({ ...showDescriptions, doublePoints: true });
      dispatch(activateDoublePoints());
      setTimeout(() => {
        dispatch({ type: "DISABLE_DOUBLE_POINTS" });
        setShowDescriptions({ ...showDescriptions, doublePoints: false });
      }, 30000);
    }
  };

  return (
    <div className="flex space-x-8 absolute -top-28 lg:left-80 left-64  md:mt-8 mt-36 mr-8">
      {!extraTimeUsed && (
        <div className="relative group">
          <button
            onMouseEnter={() =>
              setShowDescriptions({ ...showDescriptions, extraTime: true })
            }
            onMouseLeave={() =>
              setShowDescriptions({ ...showDescriptions, extraTime: false })
            }
            onClick={handleExtraTime}
            className="bg-blue-500 rounded-full p-4 hover:bg-blue-700"
          >
            <MdAccessTimeFilled  className="text-white lg:text-5xl text-4xl" />
          </button>
          {showDescriptions.extraTime && (
            <div className="absolute min-w-36  max-w-48 min-h-14 max-h-24 -top-8 left-1/2 z-20 transform -translate-x-1/2 mt-2  p-2 bg-white rounded-md shadow-lg text-violet font-semibold animate-fadeDown">
              Bu özellik oyun süresini yeniler
            </div>
          )}
        </div>
      )}
      {!extraWordUsed && (
        <div className="relative group">
          <button
            onMouseEnter={() =>
              setShowDescriptions({ ...showDescriptions, extraWord: true })
            }
            onMouseLeave={() =>
              setShowDescriptions({ ...showDescriptions, extraWord: false })
            }
            onClick={handleAddRandomWord}
            className="bg-green-500 rounded-full p-4 hover:bg-green-700"
          >
            <GiPerspectiveDiceSixFacesRandom
             
              className="text-white  lg:text-5xl text-4xl"
            />
          </button>
          {showDescriptions.extraWord && (
            <div className="absolute min-w-36 max-w-48 min-h-14 max-h-28 -top-10 left-1/2 z-20 transform -translate-x-1/2 mt-2  p-2 bg-white rounded-md shadow-lg text-violet font-semibold animate-fadeDown">
              Bu özellik rastgele 7 veya 8 harfli bir kelime ekler.
            </div>
          )}
        </div>
      )}
      {!doublePointsUsed && (
        <div className="relative group">
          <button
            onMouseEnter={() =>
              setShowDescriptions({ ...showDescriptions, doublePoints: true })
            }
            onMouseLeave={() =>
              setShowDescriptions({ ...showDescriptions, doublePoints: false })
            }
            onClick={handleDoublePoints}
            className="bg-red-500 rounded-full p-4 hover:bg-red-700"
          >
            <GiTwoCoins  className="text-white  lg:text-5xl text-4xl" />
          </button>
          {showDescriptions.doublePoints && (
            <div className="absolute min-w-36 max-w-48 min-h-14 max-h-28 -top-10 left-1/2 z-20 transform -translate-x-1/2 mt-2  p-2 bg-white rounded-md shadow-lg text-violet font-semibold animate-fadeDown">
              Bu özellik 30 saniye boyunca iki kat puan kazandırır.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Extras;
