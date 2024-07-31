import React from "react";
import "./index.css";
import Home from "./pages/Home";
import Game from "./pages/Game";
import LeaderBoard from "./pages/LeaderBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { WordContext } from "./contexts/WordContext";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToken from "./hooks/useToken";
import { loadWords } from "./redux/actions/game";
import NotFound from "./pages/NotFound";

function App() {
  const wordList = useContext(WordContext);
  const dispatch = useDispatch();
  const [token] = useToken();

  useEffect(() => {
    dispatch({ type: "ADD_USERNAME", payload: token?.user?.username });
  }, [dispatch, token?.user?.username]);

  useEffect(() => {
    dispatch(loadWords(wordList));
  }, [wordList, dispatch]);
  return (
    <div>
      <BrowserRouter>
        <Header token={token} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/userpage"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route path="/offline-game" element={<Game />} />
          <Route
            path="/online-game"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
          <Route path="/leader-board" element={<LeaderBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
