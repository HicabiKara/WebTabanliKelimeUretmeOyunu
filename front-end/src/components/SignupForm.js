import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { registerAction } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useValidation from "../hooks/useValidation";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [authData, setAuthData] = useState({ username: "", password: "" });
  const [visiblePassword, setVisiblePassword] = useState(false);
  const dispatch = useDispatch();

  const usernameRegex = /^[a-zA-Z0-9_]{6,16}$/;
  const { isValid, errorMessage } = useValidation(
    authData.username,
    usernameRegex
  );

  const onChangeFunction = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const showPasswordVisible = () => {
    setVisiblePassword(!visiblePassword);
  };

  const authFunction = (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.warning(
        "Kullanıcı Adı Uygun Değil Lütfen Geçerli Bir Değer Giriniz",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setAuthData({ username: "", password: "" });
      return;
    } else {
      dispatch(registerAction(authData));
      setAuthData({ username: "", password: "" });
    }
  };

  return (
    <div className="flex flex-col bg-white w-full max-w-md h-auto sm:w-3/4 sm:max-w-lg md:w-3/4 lg:max-w-2xl  lg:h-[600px]    items-center justify-center p-4 sm:p-6 md:p-8 rounded-lg shadow-lg animate-fadeDown">
      <h1 className="text-xl sm:text-2xl font-bold text-violet mb-5">
        Hesabınızı Oluşturun
      </h1>
      <form className="space-y-4 w-full" onSubmit={authFunction}>
        <div>
          <label
            htmlFor="username"
            className="text-violet block text-md font-medium"
          >
            Kullanıcı Adı
          </label>
          <input
            name="username"
            type="text"
            value={authData.username}
            onChange={onChangeFunction}
            id="username"
            className={`bg-white text-violet border border-white ${
              isValid ? "focus:ring-violet" : "focus:ring-red"
            } focus:ring-2 focus:outline-none block w-full p-2.5 rounded-lg transition duration-300`}
          />
          {!isValid && (
            <p className="text-red text-md mt-1 animate-fadeDown">
              {errorMessage}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-violet block text-md font-medium"
          >
            Şifre
          </label>
          <div className="flex items-center justify-between">
            <input
              type={visiblePassword ? "text" : "password"}
              name="password"
              value={authData.password}
              onChange={onChangeFunction}
              id="password"
              className="bg-white text-violet border border-white focus:ring-2 focus:ring-violet focus:outline-none block w-full p-2.5 rounded-lg transition duration-300"
            />
            <div onClick={showPasswordVisible} className="ml-3 cursor-pointer">
              {visiblePassword ? (
                <FaEye size={20} color="#806FB3" />
              ) : (
                <FaEyeSlash size={20} color="#806FB3" />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-violet w-full font-medium rounded-lg text-lg px-5 py-2.5 text-center hover:bg-white hover:text-violet hover:outline-none transition duration-300"
        >
          Hesap Oluştur
        </button>
        <p className="text-violet text-md sm:text-lg">
          Zaten bir hesabınız var mı?
          <Link
            to="/login"
            className="ml-2 text-violet rounded-full hover:underline"
          >
            Giriş yap
          </Link>
        </p>
      </form>
      <Outlet />
    </div>
  );
};

export default SignupForm;
