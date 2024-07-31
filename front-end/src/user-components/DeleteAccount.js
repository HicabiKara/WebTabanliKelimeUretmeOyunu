import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useToken from "../hooks/useToken";
import { deleteAccount } from "../redux/actions/auth";
const DeleteAccount = () => {
  const dispatch = useDispatch();
  const [token] = useToken();
  const [deletedAccInfo, setDeletedAccInfo] = useState({
    username: "",
    password: "",
  });
  const [deletedPasswordConfirm, setDeletedPasswordConfirm] = useState("");

  const onChangeFunction = (e) => {
    setDeletedAccInfo({ ...deletedAccInfo, [e.target.name]: e.target.value });
  };

  const deleteFunction = async (e) => {
    e.preventDefault();
    if(deletedAccInfo.username==="" || deletedAccInfo.password==="" || deletedPasswordConfirm===""){
      toast.warning("Lütfen Tüm Alanları Doldurun",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
     setDeletedAccInfo({username:"",password:""})
     setDeletedPasswordConfirm("")
     return; 
    }
    if (deletedAccInfo.password !== deletedPasswordConfirm) {
      toast.warning("Şifreler uyuşmuyor! Lütfen tekrar deneyin", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeletedAccInfo({ username: "", password: "" });
      setDeletedPasswordConfirm("");
    } else if (
      deletedAccInfo.username !== token?.user?.username ||
      deletedAccInfo.password !== token?.user?.password
    ) {
      toast.warning("Kullanıcı adı veya şifre hatalı! Lütfen tekrar deneyin", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeletedAccInfo({ username: "", password: "" });
      setDeletedPasswordConfirm("");
    } else {
      dispatch(deleteAccount(token?.user?._id));
      toast.success("Hesap silme işlemi başarılı", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
      }, 1250);
    }
  };
  return (
    <div className="w-5/6 bg-violet h-5/6 flex flex-col items-center rounded-lg animate-slideRight">
      <div className="w-5/6 bg-violet h-5/6 flex flex-col items-center justify-center rounded-lg">
        <h1 className="text-white text-4xl tracking-widest font-semibold">Hesabı Silme</h1>
        <form
          onSubmit={deleteFunction}
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
            value={deletedAccInfo.username}
            onChange={onChangeFunction}
            id="username"
            type="text"
            name="username"
            className="bg-white w-3/5   text-violet border border-gray  focus:ring-2 focus:ring-violet focus:outline-none   block  p-2.5 rounded-lg transition duration-300"
          ></input>
          <label
            htmlFor="password"
            className="text-white block text-lg font-medium  "
          >
            Şifre:
          </label>
          <input
            placeholder="Şifreniz..."
            type="password"
            value={deletedAccInfo.password}
            onChange={onChangeFunction}
            id="password"
            name="password"
            className="bg-white w-3/5  text-violet border border-gray  focus:ring-2 focus:ring-violet focus:outline-none   block  p-2.5 rounded-lg transition duration-300"
          ></input>
          <label
            htmlFor="password-confirm"
            className="text-white block text-lg font-medium  "
          >
            Şifre Tekrar:
          </label>
          <input
            type="password"
            placeholder="Şifre tekrarı..."
            value={deletedPasswordConfirm}
            onChange={(e) => setDeletedPasswordConfirm(e.target.value)}
            id="password-confirm"
            name="password-confirm"
            className="bg-white w-3/5  text-violet border border-gray  focus:ring-2 focus:ring-violet focus:outline-none   block  p-2.5 rounded-lg transition duration-300"
          ></input>
          <button
            type="submit"
            className=" w-auto xl:min-w-[250px] bg-white text-violet lg:text-2xl md:text-xl text-md rounded-md p-2 mt-14 font-medium tracking-normal hover:bg-violet hover:text-white transition duration-300 "
          >
            Hesabımı Sil
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
