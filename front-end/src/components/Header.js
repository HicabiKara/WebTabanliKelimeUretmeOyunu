import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { AiFillHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaRankingStar, FaUserPlus } from "react-icons/fa6";
import { IoLogInSharp } from "react-icons/io5";
import { GiConsoleController } from "react-icons/gi";

const Header = ({ token }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const logOutFunction = () => {
    localStorage.clear();
    window.location = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="bg-violet container mx-auto rounded-lg h-20 flex items-center justify-between p-4 lg:flex">
        <div className="flex items-center space-x-3 lg:hidden">
          <AiOutlineMenu
          size={27}
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <ul className="hidden lg:flex items-center space-x-3 ">
          <Link to="/leader-board">
            <li className="flex items-center bg-white rounded-full px-2 py-2 text-violet underline hover:text-white hover:bg-violet transition duration-300 text-lg lg:text-xl">
              <FaRankingStar className="mr-2" />
              En İyi Oyuncular
            </li>
          </Link>
          <Link to="/online-game">
            <li className="flex items-center bg-white rounded-full px-2 py-2 text-violet underline hover:text-white hover:bg-violet transition duration-300 text-lg lg:text-xl">
              <GiConsoleController className="mr-2" />
              Çevrimiçi Oyna
            </li>
          </Link>
          <Link to="/offline-game">
            <li className="flex items-center bg-white rounded-full px-2 py-2 text-violet underline hover:text-white hover:bg-violet transition duration-300 text-lg lg:text-xl">
              <GiConsoleController className="mr-2" />
              Çevrimdışı Oyna
            </li>
          </Link>
        </ul>
        <ul className="hidden lg:flex items-center space-x-3 text-lg">
          {token ? (
            <>
              <Link to="/userpage">
                <li className="flex items-center bg-white rounded-full px-2 py-2 text-violet underline hover:text-white hover:bg-violet transition duration-300 text-lg lg:text-lg">
                  <MdAccountCircle className="mr-2" />
                  Hesabım
                </li>
              </Link>
              <Link onClick={logOutFunction}>
                <li className="flex items-center bg-white rounded-full px-2 py-2 text-violet underline hover:text-white hover:bg-violet transition duration-300 text-lg lg:text-xl">
                  <IoLogOut className="mr-2" />
                  Çıkış Yap
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="flex items-center bg-white rounded-full px-2 py-2 text-violet underline hover:text-white hover:bg-violet transition duration-300 text-lg lg:text-xl">
                  <IoLogInSharp className="mr-2" />
                  Giriş Yap
                </li>
              </Link>
              <Link to="/signup">
                <li className="flex items-center bg-white rounded-full px-2 py-2 text-violet underline hover:text-white hover:bg-violet transition duration-300 text-lg lg:text-xl">
                  <FaUserPlus className="mr-2" />
                  Üye Ol
                </li>
              </Link>
            </>
          )}
          <Link to="/">
            <li className="flex items-center bg-white rounded-full px-2 py-2 text-violet underline hover:text-white hover:bg-violet transition duration-300 text-lg lg:text-xl">
              <AiFillHome className="mr-2" />
              Anasayfa
            </li>
          </Link>
        </ul>
      </nav>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-violet z-50 flex flex-col items-center justify-center space-y-4 animate-slideRight"
        >
          <AiOutlineClose
            size={27}
            className="absolute top-4 right-4 text-white text-2xl animate-slideLeft cursor-pointer"
            onClick={toggleMenu}
          />
          <Link to="/leader-board" onClick={toggleMenu}>
            <div className="flex items-center bg-white rounded-full px-2 py-2 text-violet md:text-2xl text-xl lg:text-xl underline hover:text-white hover:bg-violet transition duration-300">
              <FaRankingStar className="mr-2" />
              En İyi Oyuncular
            </div>
          </Link>
          <Link to="/online-game" onClick={toggleMenu}>
            <div className="flex items-center bg-white rounded-full px-2 py-2 text-violet  md:text-2xl text-xl lg:text-xl underline hover:text-white hover:bg-violet transition duration-300">
              <GiConsoleController className="mr-2" />
              Çevrimiçi Oyna
            </div>
          </Link>
          <Link to="/offline-game" onClick={toggleMenu}>
            <div className="flex items-center bg-white rounded-full px-2 py-2 text-violet md:text-2xl text-xl lg:text-xl underline hover:text-white hover:bg-violet transition duration-300">
              <GiConsoleController className="mr-2" />
              Çevrimdışı Oyna
            </div>
          </Link>
          {token ? (
            <>
              <Link to="/userpage" onClick={toggleMenu}>
                <div className="flex items-center bg-white rounded-full px-2 py-2 text-violet md:text-2xl text-xl lg:text-xl underline hover:text-white hover:bg-violet transition duration-300">
                  <MdAccountCircle className="mr-2" />
                  Hesabım
                </div>
              </Link>
              <Link onClick={() => { toggleMenu(); logOutFunction(); }}>
                <div className="flex items-center bg-white rounded-full px-2 py-2 text-violet md:text-2xl text-xl lg:text-xl underline hover:text-white hover:bg-violet transition duration-300">
                  <IoLogOut className="mr-2" />
                  Çıkış Yap
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>
                <div className="flex items-center bg-white rounded-full px-2 py-2 text-violet md:text-2xl text-xl lg:text-xl underline hover:text-white hover:bg-violet transition duration-300">
                  <IoLogInSharp className="mr-2" />
                  Giriş Yap
                </div>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <div className="flex items-center bg-white rounded-full px-2 py-2 text-violet md:text-2xl text-xl lg:text-xl underline hover:text-white hover:bg-violet transition duration-300">
                  <FaUserPlus className="mr-2" />
                  Üye Ol
                </div>
              </Link>
            </>
          )}
          <Link to="/" onClick={toggleMenu}>
            <div className="flex items-center bg-white rounded-full px-2 py-2 text-violet md:text-2xl text-xl lg:text-xl underline hover:text-white hover:bg-violet transition duration-300">
              <AiFillHome className="mr-2" />
              Anasayfa
            </div>
          </Link>
        </div>
      )}
      <Outlet />
    </header>
  );
};

export default Header;