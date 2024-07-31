import axios from "axios";
import { toast } from "react-toastify";
export const registerAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/register",
      authData
    );
    dispatch({ type: "REGISTER", payload: data });
    toast.success("Üye olma işlemi başarılı", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      window.location = "/login";
    }, 1250);
  } catch (error) {
    toast.warning(error.response.data.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const loginAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/login", authData);
    dispatch({ type: "LOGIN", payload: data });
    toast.success("Giriş yapma işlemi başarılı", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      window.location = "/userpage";
    }, 1250);
  } catch (error) {
    toast.warning(error.response.data.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const updateAccount = (id, authData) => async (dispatch) => {
  try {
    const existingUser = await axios.get(
      `http://localhost:5000/getUserByUsername/${authData.username}`
    );
    if (existingUser.data) {
      return {success:false , message:"Bu kullanıcı adı kullanılıyor,Lütfen Başka Bir Kullanıcı adı Seçin"};
    } else {
      const { data } = await axios.patch(
        `http://localhost:5000/updateAccount/${id}`,
        authData
      );
      dispatch({ type: "UPDATE_ACCOUNT", payload: data });
      return {success:true ,message:"Güncelleme İşlemi Başarılı Yeni Bilgilerinizle Giriş Yapabilirsiniz"};
    }
  } catch (error) {
   return {success:false ,message:error.message}
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/deleteAccount/${id}`);
    dispatch({ type: "DELETE_ACCOUNT", payload: id });
  } catch (error) {
    toast.warning(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
