import React from "react";
import { useState } from "react";
import { loginAction } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const [authData, setAuthData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const onChangeFunction = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const authFunction = (e) => {
    e.preventDefault();
    dispatch(loginAction(authData));
    setAuthData({username:"",password:""})
  };
  return (
    <div className="flex flex-col bg-white w-full max-w-md h-auto sm:w-3/4 sm:max-w-lg md:w-3/4 lg:max-w-2xl lg:h-[600px] p-4 sm:p-6 md:p-8 items-center justify-center rounded-lg shadow-lg animate-fadeDown">
      <h1 className="text-xl sm:text-2xl font-bold text-violet mb-5 ">
        Bilgileri Doldurarak Giriş Yapın
      </h1>
      <form className="space-y-4 w-full" onSubmit={authFunction}>
        <div>
          <label
            htmlFor="username"
            className="text-violet block text-md font-medium  "
          >
            Kullanıcı Adı
          </label>
          <input
            name="username"
            value={authData.username}
            onChange={onChangeFunction}
            type="text"
            id="username"
            className="bg-white text-violet border border-white  focus:ring-2 focus:ring-violet focus:outline-none  block w-full p-2.5 rounded-lg transition duration-300"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-violet block text-md font-medium  "
          >
            Şifre
          </label>
          <input
            value={authData.password}
            name="password"
            onChange={onChangeFunction}
            type="password"
            id="password"
            className="bg-white   text-violet border border-white focus:ring-2 focus:ring-violet focus:outline-none block w-full p-2.5 rounded-lg transition duration-300"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-violet w-full font-medium rounded-lg text-lg px-5 py-2.5 text-center hover:bg-white hover:text-violet hover:outline-none transition duration-300"
        >
          Giriş Yap
        </button>
        <p className="text-violet text-lg ">
          Henüz bir hesabınız yok mu ?
          <Link
            to="/signup"
            className="ml-2 text-violet rounded-full hover:underline"
          >
            Üye Ol
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
