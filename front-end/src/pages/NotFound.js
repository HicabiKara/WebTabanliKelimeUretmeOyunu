import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center bg-violet mt-4 rounded-md">
      <div className="text-center">
        <h1 className="text-white text-6xl font-bold">404</h1>
        <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-semibold mt-4">
          Sayfa Bulunamadı
        </h2>
        <p className="text-white text-xl lg:text-2xl xl:text-3xl mt-2">
          Aradığınız sayfa bulunamadı. Lütfen ana sayfaya dönün.
        </p>
        <Link
          to="/"
          className="bg-white text-violet mt-6 px-6 py-3 rounded-full flex items-center justify-center text-lg lg:text-xl xl:text-2xl transition-transform transform hover:scale-105"
        >
          <FaHome className="mr-2" /> Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

export default NotFound;