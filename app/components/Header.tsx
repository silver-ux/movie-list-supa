"use client";
import Link from "next/link";
import React, { useState } from "react";
import SideModal from "./SideModal";
import { AnimatePresence } from "motion/react";

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
  data: MovieData[];
};

const Header = ({ data }: Props) => {
  const [hamburger, setHamburger] = useState(false);
  const genres = data.map((item) => item.genre);
  const flat = genres.flat();
  const unique = [...new Set(flat)];
  console.log(unique);

  return (
    <>
      <header className="h-[90px] max-w-[1300px] w-full mx-auto px-[5%] font-bold mt-7 sm:mt-10 mb-3 sm:mb-5 relative">
        <div
          onClick={() => setHamburger(!hamburger)}
          className="z-99 absolute w-15 h-15 rounded-2xl bg-black cursor-pointer top-[50%] translate-y-[-50%] flex flex-col justify-center items-center"
        >
          <span className="block w-[50%] h-1 bg-white"></span>
          <span className="blcok w-[50%] h-1 bg-white my-2"></span>
          <span className="blcok w-[50%] h-1 bg-white"></span>
        </div>
        <div className="flex items-center h-full justify-center invisible sm:visible">
          <Link href={"/new"} className="bg-sky-100 px-5 py-3 mx-4 block">
            映画を追加する
          </Link>
          <Link href={"/"} className="bg-red-100 px-5 py-3 mx-4 block">
            一覧に戻る
          </Link>
        </div>
      </header>
      <AnimatePresence>
        {hamburger && <SideModal unique={unique} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
