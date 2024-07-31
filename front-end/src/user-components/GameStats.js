import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameDataByUsername } from "../redux/actions/game";
import useToken from "../hooks/useToken";
import useDateFormat from "../hooks/useDateFormat";

const GameStats = () => {
  const { formatPlayDate } = useDateFormat();
  const [selectedGameWords, setSelectedGameWords] = useState([]);
  const [token] = useToken();
  const username = token?.user?.username;
  const userGameDatas = useSelector((state) => state.game.userGameDatas);
  const datas = userGameDatas?.data?.userGameData;
  const dispatch = useDispatch();

  const showWordsModal = (foundWords) => {
    setSelectedGameWords(foundWords);
  };

  const closeWordsModal = useCallback(() => {
    document
      .getElementById("words-content")
      .classList.replace("animate-fadeDown", "animate-fadeUp");
    setTimeout(() => {
      setSelectedGameWords([]);
    }, 300);
  }, []);

  useEffect(() => {
    if (username) {
      dispatch(getGameDataByUsername(username));
    }
  }, [dispatch, username]);

  return (
    <div className="flex justify-center animate-slideRight h-screen container mx-auto">
      <div className="w-full max-h-[70vh] overflow-y-auto text-lg rtl:text-right text-violet">
        {datas && datas.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {datas.map((gameData, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">No:</span>
                  <span>{i + 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Kullanıcı Adı:</span>
                  <span>{gameData.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Puan:</span>
                  <span>{gameData.totalScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Bulunan Kelime Sayısı:</span>
                  <span>{gameData.totalWordsFound}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Bulunan Kelimeler:</span>
                  <button
                    onClick={() => showWordsModal(gameData.foundWords)}
                    className="p-2 text-white bg-violet rounded-lg text-center hover:opacity-85 text-xs md:text-sm"
                  >
                    Kelimeleri Görüntüle
                  </button>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Oynama Tarihi:</span>
                  <span>{formatPlayDate(gameData.playDate)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="text-violet tracking-wider font-semibold text-center text-4xl mt-4">
              Kayıtlı Oyun Verisi Bulunamadı
            </h1>
          </div>
        )}
      </div>
      {selectedGameWords.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeWordsModal}
          ></div>
          <div
            className="bg-white rounded-lg p-8 max-w-lg animate-fadeDown"
            id="words-content"
          >
            <h2 className="text-2xl font-bold mb-4 text-violet">
              Bulunan Kelimeler
            </h2>
            <ul className="overflow-auto">
              {selectedGameWords.map((word, index) => (
                <li
                  key={index}
                  className="text-xl font-semibold tracking-wider text-violet text-center"
                >
                  {word}
                </li>
              ))}
            </ul>
            <button
              className="bg-violet text-white rounded-lg p-2 text-center mt-4 hover:opacity-85"
              onClick={closeWordsModal}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStats;
