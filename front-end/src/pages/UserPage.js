import React from "react";
import ProfileInfo from "../user-components/ProfileInfo";
import GameStats from "../user-components/GameStats";
import DeleteAccount from "../user-components/DeleteAccount";
import { useState } from "react";
const UserPage = () => {
  
  const [currentComponent, setCurrentComponent] = useState(null);
  const handleShowProfileInfo = () => {
    setCurrentComponent("profile-info");
  };
  const handleShowGameStats = () => {
    setCurrentComponent("game-stats");
  };
  const handleDeleteAccount = () => {
    setCurrentComponent("delete-account");
  };
  const logOutFunction = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
      <div className="container mx-auto h-screen bg-violet my-3 flex flex-col  items-center justify-center rounded-lg animate-fadeDown">
        <div className="flex items-center justify-center mt-20 p-3">
          <h1 className="text-white lg:text-5xl text-4xl font-semibold text-center tracking-widest">
            Hesap Ayarları
          </h1>
        </div>
        <div className="flex lg:flex-row flex-col  items-center justify-between w-full h-full">
          <div className="lg:w-1/6 lg:h-3/4 w-5/6  h-auto bg-white p-3 rounded-lg mx-auto flex lg:flex-col flex-row items-center">
            <button
              className="text-white lg:text-xl text-md bg-violet rounded-lg lg:mt-7 mt-7 mx-3 h-20 xl:w-[200px] w-[150px] hover:text-violet hover:bg-white transition duration-300"
              onClick={handleShowProfileInfo}
            >
              Hesap Bilgilerini Görüntüle
            </button>
            <button
              className="text-white lg:text-xl text-md bg-violet rounded-lg lg:mt-7 mt-7 mx-3 h-20 xl:w-[200px] w-[150px] hover:text-violet hover:bg-white transition duration-300"
              onClick={handleShowGameStats}
            >
              Oyun Verilerini Görüntüle
            </button>
            <button
              className="text-white lg:text-xl text-md bg-violet rounded-lg lg:mt-7 mt-7 mx-3 h-20 xl:w-[200px] w-[150px] hover:text-violet hover:bg-white transition duration-300"
              onClick={handleDeleteAccount}
            >
              Hesabımı Sil
            </button>
            <button
              onClick={logOutFunction}
              className="text-white lg:text-xl text-md bg-violet rounded-lg lg:mt-7 mt-7 mx-3 h-20 xl:w-[200px] w-[150px] hover:text-violet hover:bg-white transition duration-300"
            >
              Çıkış Yap
            </button>
          </div>
          <div className="lg:w-4/6 h-3/4 w-5/6 mb-9 p-2 bg-white rounded-lg mx-auto flex flex-col items-center justify-center ">
            {currentComponent === "profile-info" && <ProfileInfo/>}
            {currentComponent === "game-stats" && <GameStats />}
            {currentComponent === "delete-account" && <DeleteAccount />}
          </div>
        </div>
      </div>
  );
};

export default UserPage;
