"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="h-[90px] flex items-center justify-center font-bold">
      <Link href={"/new"} className="bg-sky-100 px-5 py-3 mx-4">
        映画を追加する
      </Link>
      <Link href={"/"} className="bg-red-100 px-5 py-3 mx-4">
        一覧に戻る
      </Link>
    </header>
  );
};

export default Header;
