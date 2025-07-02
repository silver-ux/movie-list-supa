"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideModal from "./SideModal";
import { AnimatePresence } from "motion/react";
import { useScrollLock } from "./ScrollLock";
import { getUser } from "@/supabase/user";
import { User } from "@supabase/supabase-js";
import { signout } from "@/supabase/signout";

type MovieData = {
  created_at: string;
  id: number;
  image_url: string;
  stars: number;
  title: string;
  name: string;
  genre: string[];
};

type Props = {
  data: MovieData[] | null;
  setData: React.Dispatch<React.SetStateAction<MovieData[] | null>>;
  setGenreSelected: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ data, setData, setGenreSelected }: Props) => {
  const [hamburger, setHamburger] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useScrollLock(hamburger);

  const genres = data?.map((item) => item.genre);
  const flat = genres?.flat();
  const unique = [...new Set(flat)];

  useEffect(() => {
    const func = async () => {
      const { user, error } = await getUser();
      if (user) {
        setCurrentUser(user);
      } else {
        console.error(error);
      }
    };
    func();
  }, []);

  const logout = async () => {
    await signout();
    setCurrentUser(null);
    const response = await fetch("/api/movies");
    const json = (await response.json()) as MovieData[];
    setData(json);
  };

  return (
    <>
      <header className="h-[90px] max-w-[1300px] w-full mx-auto px-[5%] text-[14px] font-bold mt-7 sm:mt-10 mb-3 sm:mb-5 flex justify-around items-center">
        <div
          onClick={() => setHamburger(!hamburger)}
          className="z-10 w-15 h-15 rounded-2xl bg-black cursor-pointer  flex flex-col justify-center items-center relative"
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
        {hamburger && (
          <SideModal
            unique={unique}
            setGenreSelected={setGenreSelected}
            setHamburger={setHamburger}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
