import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGameData } from "../redux/actions/game";
import useDateFormat from "../hooks/useDateFormat";

const ScoreBoard = () => {
  const { formatPlayDate } = useDateFormat();
  const [selectedGameWords, setSelectedGameWords] = useState([]);
  const dispatch = useDispatch();
  const scoreBoardDatas = useSelector((state) => state?.game?.scoreBoardDatas);

  useEffect(() => {
    dispatch(getGameData());
  }, [dispatch]);

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

  return (
    <div className="container mx-auto min-h-screen px-4">
      <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl tracking-widest text-center my-8 font-bold outline-none bg-violet py-2 px-4">
        En İyi Oyuncular
      </h1>
      <div className="animate-fadeDown relative shadow-md sm:rounded-lg my-8 max-h-[700px] max-w-full overflow-hidden">
        <table className="min-w-full text-sm sm:text-base lg:text-lg rtl:text-right text-violet">
          {scoreBoardDatas && scoreBoardDatas.length > 0 && (
            <thead className="text-xs sm:text-sm lg:text-base text-violet uppercase bg-white sticky top-0 text-center">
              <tr className="text-center">
                <th scope="col" className="px-1 sm:px-2 lg:px-6 py-3">
                  Sıra
                </th>
                <th scope="col" className="px-1 sm:px-2 lg:px-6 py-3">
                  Kullanıcı Adı
                </th>
                <th scope="col" className="px-1 sm:px-2 lg:px-6 py-3">
                  Puan
                </th>
                <th scope="col" className="px-1 sm:px-2 lg:px-6 py-3">
                  Bulunan Kelime Sayısı
                </th>
                <th scope="col" className="px-1 sm:px-2 lg:px-6 py-3">
                  Bulunan Kelimeler
                </th>
                <th scope="col" className="px-1 sm:px-2 lg:px-6 py-3">
                  Oynama Tarihi
                </th>
              </tr>
            </thead>
          )}

          <tbody>
            {scoreBoardDatas && scoreBoardDatas.length > 0 ? (
              <>
                {scoreBoardDatas.map((gameData, i) => (
                  <tr key={i} className="bg-white border-b">
                    <td className="px-1 sm:px-2 lg:px-6 py-4 font-medium text-violet whitespace-nowrap text-center">
                      {i + 1}
                    </td>
                    <td className="px-1 sm:px-2 lg:px-6 py-4 text-center">
                      {gameData?.data?.username}
                    </td>
                    <td className="px-1 sm:px-2 lg:px-6 py-4 text-center">
                      {gameData?.data?.totalScore}
                    </td>
                    <td className="px-1 sm:px-2 lg:px-6 py-4 text-center">
                      {gameData?.data?.totalWordsFound}
                    </td>
                    <td className="px-1 sm:px-2 lg:px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          showWordsModal(gameData?.data?.foundWords)
                        }
                        className="p-1 sm:p-2 text-white bg-violet rounded-lg text-center hover:opacity-85"
                      >
                        Kelimeleri Görüntüle
                      </button>
                    </td>
                    <td className="px-1 sm:px-2 lg:px-6 py-4 text-center">
                      {formatPlayDate(gameData?.data?.playDate)}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="flex items-center justify-center">
                <td
                  colSpan={6}
                  className="text-white text-center text-xl sm:text-2xl lg:text-4xl"
                >
                  Oyuncu Verisi Bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedGameWords.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-6 lg:px-8">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeWordsModal}
          ></div>
          <div
            className="bg-white rounded-lg p-4 sm:p-8 max-w-lg animate-fadeDown"
            id="words-content"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-violet">
              Bulunan Kelimeler
            </h2>
            <ul className="overflow-auto max-h-64">
              {selectedGameWords.map((word, index) => (
                <li
                  key={index}
                  className="text-lg sm:text-xl font-semibold tracking-wider text-violet text-center"
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

export default ScoreBoard;
