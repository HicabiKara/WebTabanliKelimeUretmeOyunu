import React from "react";
import { useState } from "react";
import useToken from "../hooks/useToken";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateAccount } from "../redux/actions/auth";
import useValidation from "../hooks/useValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const [token] = useToken();
  const [isUpdate, setIsUpdate] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [updatedAccInfo, setUpdatedAccInfo] = useState({
    username: "",
    password: "",
  });
  const [updatedPasswordConfirm, setUpdatedPasswordConfirm] = useState("");
  const usernameRegex = /^[a-zA-Z0-9_]{6,16}$/;
  const { isValid, errorMessage } = useValidation(
    updatedAccInfo.username,
    usernameRegex
  );

  const showPasswordVisible = () => {
    setVisiblePassword(!visiblePassword);
  };

  const onChangeFunction = (e) => {
    setUpdatedAccInfo({ ...updatedAccInfo, [e.target.name]: e.target.value });
  };

  const updateFunction = async (e) => {
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
      setUpdatedAccInfo({ username: "", password: "" });
      setUpdatedPasswordConfirm("");
      return;
    }
    if (
      updatedAccInfo.username === "" ||
      updatedAccInfo.password === "" ||
      updatedPasswordConfirm === ""
    ) {
      toast.warning("Lütfen Tüm Alanları Doldurun", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUpdatedAccInfo({ username: "", password: "" });
      setUpdatedPasswordConfirm("");
      return;
    }
    if (updatedAccInfo.password !== updatedPasswordConfirm) {
      toast.warning("Şifreler uyuşmuyor! Lütfen tekrar deneyin", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUpdatedAccInfo({ username: "", password: "" });
      setUpdatedPasswordConfirm("");
    } else {
      const updateResult = await dispatch(
        updateAccount(token?.user?._id, updatedAccInfo)
      );

      if (updateResult.success) {
        toast.success(updateResult.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUpdatedAccInfo({ username: "", password: "" });
        setUpdatedPasswordConfirm("");
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/";
        }, 1250);
      } else {
        toast.error(updateResult.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUpdatedAccInfo({ username: "", password: "" });
        setUpdatedPasswordConfirm("");
      }
    }
  };

  return (
    <div className="w-5/6 max-w-2xl bg-violet h-5/6 flex flex-col items-center rounded-lg animate-slideRight">
      {isUpdate ? (
        <div className="w-auto max-w-xl bg-violet h-auto flex flex-col items-center justify-center rounded-lg">
          <h1 className="text-white text-3xl md:text-4xl tracking-widest font-semibold">
            Hesap Bilgilerini Güncelle
          </h1>
          <form
            onSubmit={updateFunction}
            className="w-full flex flex-col items-start ml-12 mt-12"
          >
            <label
              htmlFor="username"
              className="text-white block text-lg font-medium"
            >
              Kullanıcı Adı:
            </label>
            <input
              placeholder="Kullanıcı adınız..."
              value={updatedAccInfo.username}
              onChange={onChangeFunction}
              type="text"
              id="username"
              name="username"
              className={`bg-white w-3/5 text-violet border border-gray ${
                isValid ? "focus:ring-violet" : "focus:ring-red"
              } focus:ring-2 focus:ring-violet focus:outline-none block p-2.5 rounded-lg transition duration-300`}
            />
            {!isValid && (
              <p className="text-red text-md mt-1 animate-fadeDown">
                {errorMessage}
              </p>
            )}
            <label
              htmlFor="password"
              className="text-white block text-lg font-medium"
            >
              Şifre:
            </label>
            <input
              placeholder="Şifreniz..."
              value={updatedAccInfo.password}
              onChange={onChangeFunction}
              id="password"
              name="password"
              type="password"
              className="bg-white w-3/5 text-violet border border-gray focus:ring-2 focus:ring-violet focus:outline-none block p-2.5 rounded-lg transition duration-300"
            />
            <label
              htmlFor="updatedPassword-confirm"
              className="text-white block text-lg font-medium"
            >
              Şifre Tekrar:
            </label>
            <input
              placeholder="Şifre tekrarı..."
              value={updatedPasswordConfirm}
              onChange={(e) => setUpdatedPasswordConfirm(e.target.value)}
              type="password"
              id="updatedPassword-confirm"
              name="updatedPassword-confirm"
              className="bg-white w-3/5 text-violet border border-gray focus:ring-2 focus:ring-violet focus:outline-none block p-2.5 rounded-lg transition duration-300"
            />
            <div className="flex flex-row items-center justify-between">
              <button
                type="submit"
                className="mr-4 w-[140px] md:w-auto xl:min-w-[250px] bg-white text-violet lg:text-2xl md:text-xl text-md p-2 rounded-md mt-14 font-medium tracking-normal hover:bg-violet hover:text-white transition duration-300"
              >
                Değişiklikleri Kaydet
              </button>
              <button
                onClick={() => setIsUpdate(false)}
                className="w-[140px] md:w-auto xl:min-w-[250px] bg-white text-violet lg:text-2xl md:text-xl text-md p-2 rounded-md mt-14 font-medium tracking-normal hover:bg-violet hover:text-white transition duration-300"
              >
                Geri Dön
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-violet h-auto lg:h-[500px] sm:w-3/4 sm:max-w-lg md:w-3/4 flex flex-col items-center justify-center rounded-lg">
          <h1 className="text-white md:text-4xl text-3xl tracking-widest font-semibold">
            Hesap Bilgileri
          </h1>
          <form className="w-full flex flex-col items-start ml-12 mt-12 relative">
            <label
              htmlFor="currentUsername"
              className="text-white block text-lg font-medium"
            >
              Kullanıcı Adı:
            </label>
            <input
              value={token?.user?.username || ""}
              type="text"
              disabled
              id="currentUsername"
              name="currentUsername"
              className="bg-white w-3/5 text-violet border border-gray focus:ring-2 focus:ring-violet focus:outline-none block p-2.5 rounded-lg transition duration-300"
            />
            <label
              htmlFor="currentPassword"
              className="text-white block text-lg font-medium"
            >
              Şifre:
            </label>
            <input
              value={token?.user?.password || ""}
              type={visiblePassword ? "text" : "password"}
              disabled
              id="currentPassword"
              name="currentPassword"
              className="bg-white w-3/5 text-violet border border-gray focus:ring-2 focus:ring-violet focus:outline-none block p-2.5 rounded-lg transition duration-300"
            />
            <button
              onClick={() => setIsUpdate(true)}
              className="w-auto p-2 xl:min-w-[250px] bg-white text-violet lg:text-2xl md:text-xl text-md rounded-md mt-14 font-medium tracking-normal hover:bg-violet hover:text-white transition duration-300"
            >
              Bilgilerimi Güncelle
            </button>
            <div
              onClick={showPasswordVisible}
              className="cursor-pointer absolute top-28 right-28 xl:right-36"
            >
              {visiblePassword ? (
                <FaEye size={28} color="#FFF" />
              ) : (
                <FaEyeSlash size={28} color="#FFF" />
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;