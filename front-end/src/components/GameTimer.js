import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector, useDispatch } from "react-redux";
import { saveGameData } from "../redux/actions/game";
import { useState, useEffect } from "react";

const GameTimer = ({ isPlaying, isOnlineGame }) => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.game);
  const extraTimeUsed = useSelector((state) => state.game.extraTimeUsed);

  const [key, setKey] = useState(0); // Timer'ı resetlemek için 
  const [duration, setDuration] = useState(180);


  useEffect(() => {
    if (extraTimeUsed) {
      setDuration(180);
      setKey((prevKey) => prevKey + 1); // Timer'ı resetlemek için key değiştirilir
    }
  }, [extraTimeUsed]);

  const handleCompleteGame = () => {
    dispatch(saveGameData(gameData, isOnlineGame));
    return [false, 0];
  };

  const renderTime = ({ remainingTime }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-white lg:text-lg text-md">Kalan Süre</div>
        <div className="lg:text-4xl text-2xl text-white">{remainingTime}</div>
        <div className="text-white lg:text-lg text-md">saniye</div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center">
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        colors={["#fff"]}
        onComplete={handleCompleteGame}
        size={140}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default GameTimer;