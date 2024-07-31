  import React, { useState, useEffect } from "react";
  import { RiHexagonFill } from "react-icons/ri";
  import { RxUpdate } from "react-icons/rx";
  import { useSelector, useDispatch } from "react-redux";
  import { createLetters, checkWord, saveGameData } from "../redux/actions/game";
  import GameTimer from "./GameTimer";
  import "../index.css";
  import Modal from "./Modal";
  import Extras from "./Extras";

  const GameBoard = () => {
    const [word, setWord] = useState("");
    const [isOnlineGame, setIsOnlineGame] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(null);
    const gameData = useSelector((state) => state.game);
    const modalData = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {
      const currentPath = window.location.pathname;
      setIsOnlineGame(currentPath === "/online-game");
    }, []);

    //Component yeniden yüklendiğinde oyun verilerini sıfırla
    useEffect(() => {
      dispatch({ type: "FINISH_GAME" });
    }, [dispatch]);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        const finishButton = document.getElementById("finish-button");
        if (finishButton) {
          finishButton.classList.remove("hidden");
        }
      }, 31000);
      return () => clearTimeout(timer);
    }, [gameData?.gameStarted]);

    const handleStartGame = (e) => {
      e.preventDefault();
      dispatch({ type: "START_GAME" });
      dispatch(createLetters);
    };

    const finishGame = () => {
      dispatch(saveGameData(gameData, isOnlineGame));
    };

    const handleClickLetter = (letter, index) => {
      if (letter === undefined) return;
      setWord(word + letter);
      setClickedIndex(index);
      setTimeout(() => {
        setClickedIndex(null);
      }, 300); 
    };

    const handleDeleteLetter = () => {
      if (word.length > 0) {
        setWord(word.slice(0, -1));
      }
    };
    const handleCreateWord = (newWord) => {
      dispatch(checkWord(newWord));
      setWord("");
    };
    const renderHexagon = (letter, index) => (
      <div className="relative" key={index}>
        <RiHexagonFill
          className={`transition-all duration-300 lg:text-9xl md:text-8xl text-7xl ${
            clickedIndex === index
              ? "animate-hexColorChange"
              : "fill-current text-violet"
          }`}
          style={{
            fill: clickedIndex === index ? "#FFF" : "#806FB3",
            color: clickedIndex === index ? "#806FB3" : "#FFF",
          }}
        />
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center ${
            gameData.gameStarted ? "cursor-pointer" : ""
          }`}
          onClick={() => handleClickLetter(letter, index)}
        >
          <span
            className={`text-white lg:text-5xl md:text-3xl text-2xl font-bold ${
              clickedIndex === index ? "text-violet" : ""
            }`}
          >
            {gameData.gameStarted && letter}
          </span>
        </div>
      </div>
    );

    return (
      <div className="relative flex  items-center justify-between">
        {modalData?.modalShow && (
          <Modal
            modalShow={modalData?.modalShow}
            modalTitle={modalData?.modalTitle}
            ModalDescription={modalData?.modalDescription}
          />
        )}
        {gameData.gameStarted && <Extras />}
      
          <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center mb-4 md:mr-0 mr-4" id="leftBar">
            {gameData.gameStarted && (
              <div
                className="flex md:flex-col flex-row items-center justify-between h-auto mr-16 animate-slideLeft"
                id="leftBar"
              >
                <button
                  id="finish-button"
                  onClick={finishGame}
                  className="hidden my-4 w-full md:mr-0 mr-3  text-center font-semibold bg-white rounded-full p-3 text-violet tracking-normal lg:text-xl md:text-md text-sm hover:font-medium hover:bg-violet hover:text-white hover:outline-none animation duration-200 animate-slideLeft"
                >
                  OYUNU BİTİR
                </button>
                
                <GameTimer
                  isOnlineGame={isOnlineGame}
                  isPlaying={gameData?.gameStarted}
                ></GameTimer>
                
              </div>
            )}
          </div>
      
        <div className="flex flex-col bg-white px-5 py-5 rounded-xl shadow-lg animate-fadeDown">
          {!gameData.gameStarted && (
            <button
              onClick={handleStartGame}
              className="w-full mr-5 text-center font-normal bg-violet rounded-md p-3 text-white tracking-normal xl:text-xl lg:text-lg text-md hover:font-medium hover:bg-white hover:text-violet hover:outline-none hover:text-2xl hover:tracking-widest animation duration-200"
            >
              OYUNU BAŞLAT
            </button>
          )}
          <div className="flex flex-col justify-center items-center lg:h-[500px] xl:h-[550px] md:h-[400px] h-[350px]  xl:w-[500px] lg:w-[400px] md:w-[350px] w-[250px]">
            <div className="w-full mx-auto my-auto">
              <input
                placeholder="Kelimeniz..."
                type="text"
                id="word"
                name="word"
                value={gameData.gameStarted ? word : ""}
                disabled={gameData.letters.length === 0 && "disabled"}
                onChange={(e) => setWord(e.target.value)}
                className="placeholder-violet bg-white w-full lg:text-2xl md:text-xl text-lg text-violet border border-white  focus:ring-2 focus:ring-violet focus:outline-none   p-2 rounded-lg transition duration-300"
              />
            </div>
            <div className="flex flex-row justify-between">
              {renderHexagon(gameData?.letters?.[0], 0)}
              {renderHexagon(gameData?.letters?.[4], 4)}
            </div>
            <div className="flex items-center justify-between">
              {renderHexagon(gameData?.letters?.[3], 3)}
              {renderHexagon(gameData?.letters?.[2], 2)}
              {renderHexagon(gameData?.letters?.[1], 1)}
            </div>
            <div className="flex flex-row items-center justify-between">
              {renderHexagon(gameData?.letters?.[5], 5)}
              {renderHexagon(gameData?.letters?.[6], 6)}
            </div>
          </div>
          {gameData?.gameStarted && (
            <div className="flex flex-row items-center justify-between relative my-3 animate-fadeDown">
              <button
                onClick={handleDeleteLetter}
                className="bg-violet text-white lg:text-2xl md:text-xl text-md font-medium rounded-xl px-5 py-2.5 text-center"
              >
                Sil
              </button>
              {gameData?.gameStarted && (
                <button
                  className="absolute md:left-[46%] left-[35%] cursor-pointer"
                  onClick={() => dispatch(createLetters)}
                >
                  <RxUpdate className="lg:text-5xl md:text-3xl text-2xl" color="#806FB3" />
                </button>
              )}

              <button
                onClick={() => handleCreateWord(word)}
                className="bg-violet text-white lg:text-2xl md:text-xl text-md font-medium rounded-xl px-5 py-2.5 text-center "
              >
                Oluştur
              </button>
            </div>
          )}
        </div>
        </div>
        {gameData?.gameStarted && (
          <div
            className="bg-white md:h-full h-[458px] mt-[155px] md:mt-0 rounded-xl shadow-lg mx-5 p-2 overflow-y-auto animate-slideRight"
            id="rightBar"
          >
            <div className="text-violet tracking-normal md:text-lg lg:text-2xl  text-md font-semibold h-[100px] text-center">
              TOPLAM PUAN
              <div className="bg-violet w-full h-auto p-2 rounded-lg text-white text-center flex items-center justify-center mt-3 shadow-lg">
                {gameData?.totalScore}
              </div>
            </div>
              <h2 className="text-violet tracking-normal lg:text-xl md:text-lg text-md font-semibold mt-3 text-center border-b-2 border-b-violet">
                BULUNAN KELİMELER
              </h2>
              <ul className="w-auto flex flex-col items-center justify-center overflow-auto max-h-[450px]">
                {gameData?.foundWords.map((word, index) => (
                  <li
                    className="text-violet lg:text-2xl xl:text-3xl md:text-lg text-md text-center my-1 font-semibold"
                    key={index}
                  >
                    {word}
                  </li>
                ))}
              </ul>  
          </div>
        )}
      </div>
    );
  };

  export default GameBoard;
