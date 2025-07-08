"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import SideModal from "./SideModal";
import { AnimatePresence } from "motion/react";
import { useScrollLock } from "../hooks/ScrollLock";
import { signout } from "@/supabase/signout";
import { MyContext } from "../context/Context";

const Header = () => {
  const [hamburger, setHamburger] = useState(false);
  useScrollLock(hamburger);

  const { movieData, currentUser, setCurrentUser } = useContext(MyContext);

  if (!Array.isArray(movieData) || movieData.length < 1) {
    throw new Error("データが存在しません");
  }

  const genres = movieData.map((item) => item.genre);
  const flat = genres?.flat();
  const unique = [...new Set(flat)];

  const logout = async () => {
    await signout();

    setCurrentUser(null);
  };

  return (
    <>
      <header className="h-[90px] max-w-[1300px] w-full mx-auto px-[5%] text-[14px] font-bold mt-7 sm:mt-10 mb-3 sm:mb-5 flex justify-between items-center relative">
        <div
          onClick={() => setHamburger(!hamburger)}
          className="z-10 w-15 h-15 rounded-2xl bg-black cursor-pointer flex flex-col justify-center items-center relative"
        >
          {hamburger ? (
            <>
              <span className="absolute w-[50%] h-1 bg-white rotate-[45deg]"></span>
              <span className="absolute w-[50%] h-1 bg-white rotate-[-45deg]"></span>
            </>
          ) : (
            <>
              <span className="block w-[50%] h-1 bg-white"></span>
              <span className="blcok w-[50%] h-1 bg-white my-2"></span>
              <span className="blcok w-[50%] h-1 bg-white"></span>
            </>
          )}
        </div>
        {currentUser && (
          <div className="sm:flex items-center h-full justify-center hidden">
            <Link href={"/new"} className="bg-sky-100 px-5 py-3 mx-4 block">
              映画を追加
            </Link>
            <Link href={"/"} className="bg-red-100 px-5 py-3 mx-4 block">
              一覧に戻る
            </Link>
          </div>
        )}
        {currentUser ? (
          <div>
            <button className="cursor-pointer" onClick={logout}>
              ログアウト
            </button>
          </div>
        ) : (
          <div>
            <Link href={"/login"} className="blcok">
              ログイン
            </Link>
            <Link href={"/signup"} className="blcok ml-3">
              アカウント作成
            </Link>
          </div>
        )}
      </header>
      <AnimatePresence>
        {hamburger && <SideModal unique={unique} setHamburger={setHamburger} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
