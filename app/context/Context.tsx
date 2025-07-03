"use client";
import React, { createContext, useEffect, useState } from "react";
import { getUser } from "@/supabase/user";
import { User } from "@supabase/supabase-js";

type MyContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  movieData: MovieData[];
  setMovieData: React.Dispatch<React.SetStateAction<MovieData[]>>;
  genreSelected: string;
  setGenreSelected: React.Dispatch<React.SetStateAction<string>>;
  showMyList: boolean;
  setShowMyList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MovieData = {
  created_at: string;
  id: number;
  image_url: string;
  stars: number;
  title: string;
  name: string;
  genre: string[];
  user_id: string;
};

// 初期値として型に合うダミーのオブジェクトを用意
const defaultContextValue: MyContextType = {
  currentUser: null,
  setCurrentUser: () => {}, // 空関数（初期値なので実際には使わない）
  movieData: [],
  setMovieData: () => {},
  genreSelected: "",
  setGenreSelected: () => {},
  showMyList: false,
  setShowMyList: () => {},
};

export const MyContext = createContext<MyContextType>(defaultContextValue);

const Context = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const [genreSelected, setGenreSelected] = useState<string>("");
  const [showMyList, setShowMyList] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { user, error } = await getUser();
      if (user) {
        setCurrentUser(user);
      } else {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <MyContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        movieData,
        setMovieData,
        genreSelected,
        setGenreSelected,
        showMyList,
        setShowMyList,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default Context;
