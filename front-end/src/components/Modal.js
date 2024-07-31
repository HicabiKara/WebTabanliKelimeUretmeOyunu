import React, { useEffect, useCallback } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createLetters } from "../redux/actions/game";

const Modal = ({ modalShow, modalTitle, ModalDescription }) => {
  const dispatch = useDispatch();
  const words = useSelector((state) => state?.modal?.foundWords);
  const gameData = useSelector((state) => state?.game);
  const handleStartGame = () => {
    dispatch({ type: "START_GAME" });
    dispatch(createLetters);
    dispatch({ type: "HIDE_MODAL" });
  };
  const handleClose = useCallback(() => {
    document
      .getElementById("modal")
      .classList.replace("animate-fadeDown", "animate-fadeUp");

    setTimeout(() => {
      dispatch({
        type: "HIDE_MODAL",
      });
    }, 300);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById("modal");
      if (modal && !modal.contains(event.target)) {
        handleClose();
      }
    };

    if (modalShow) {
      setTimeout(() => {
        window.addEventListener("mousedown", handleClickOutside);
      }, 0);
    }

     
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalShow, handleClose]);

  return (
    <div className="">
      {modalShow && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              id="modal"
              className={`bg-white rounded-lg p-2 ${
                words.length > 0 ? "w-[350px] h-[400px]" : "w-80 h-72 "
              } border-violet border-2 flex flex-col  animate-fadeDown overflow-auto `}
            >
              <div className="flex items-center justify-between ">
                <h1 className="text-violet lg:text-xl md:text-lg text-md font-semibold">
                  {modalTitle}
                </h1>
                <IoCloseSharp
                  size={30}
                  color="#806FB3"
                  onClick={handleClose}
                  className="cursor-pointer"
                />
              </div>
              <div className="text-violet xl:text-2xl lg:text-xl md:text-lg text-md text-center border-b-2 border-violet mt-5">
                {!gameData?.gameStarted
                  ? `Toplam Puanınız: ${ModalDescription}`
                  : ModalDescription}
                {!gameData?.gameStarted && (
                  <div className="text-center text-violet xl:text-2xl lg:text-xl md:text-lg text-md   mt-3">
                    Bulduğunuz Kelimeler
                  </div>
                )}
              </div>
              <div className="overflow-auto">
                <ul className="flex flex-col items-center justify-center list-none">
                  {words.map((word, i) => (
                    <li
                      className="text-violet lg:text-xl md:text-lg text-md font-semibold mx-2"
                      key={i}
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between mt-[90px]">
                <button
                  onClick={handleClose}
                  className="bg-violet w-1/3   text-white rounded-md hover:opacity-80 text-md p-2"
                >
                  Kapat
                </button>
                {!gameData?.gameStarted && (
                  <button
                    onClick={handleStartGame}
                    className="bg-violet w-1/3  text-white rounded-md hover:opacity-80 text-md p-2"
                  >
                    Tekrar Oyna
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
