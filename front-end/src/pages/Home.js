import React from "react";
import img1 from "../img/img1.jpg";
import { FaStar } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white h-screen rounded-lg my-4">
        <div className="min-h-[500px] container mx-auto bg-violet rounded-lg flex flex-col lg:flex-row justify-between items-center animate-slideRight p-4">
          <div className="my-12 text-center lg:text-left">
            <h1 className="text-white text-3xl lg:text-5xl xl:text-6xl font-bold">
              Yeni Nesil Kelime Üretme Oyunu
            </h1>
            <p className="text-white mt-2 text-xl">
              Altıgen harf sistemini kullanarak anlamlı kelimeler üretin!
            </p>
          </div>
          <img
            alt="img"
            src={img1}
            className="w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-full outline-none"
          />
        </div>
        <div className="min-h-[550px] container bg-violet rounded-lg mt-5 h-72 flex flex-col justify-center items-center animate-slideLeft p-4">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-widest font-semibold text-center">
            Nasıl Oynanır?
          </h1>
          <div className="text-white text-lg lg:text-2xl mt-2 tracking-wide text-center">
            {[
              "Altıgenlerin içersindeki harfleri kullanarak anlamlı kelimeler üretin",
              "Merkez altıgendeki harfi daima kullanın",
              "Her seferinde en az 4 veya daha fazla harf içeren bir kelime üretin",
              "Her ekstra harf için bonus puan kazanın",
              "Bir oyun süresinde en yüksek puanı alarak liderlik sıralamasına girin",
            ].map((text, index) => (
              <div
                key={index}
                className="bg-white text-violet min-h-14 rounded-full flex items-center justify-center my-3 text-lg md:text-xl lg:text-2xl xl:text-3xl p-2"
              >
                <div className="bg-white rounded-full mx-4 text-4xl lg:text-5xl xl:text-6xl">
                  <FaStar color="#806FB3" />
                </div>
                {text}
                <div className="bg-white rounded-full mx-4 text-4xl lg:text-5xl xl:text-6xl">
                  <FaStar color="#806FB3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;