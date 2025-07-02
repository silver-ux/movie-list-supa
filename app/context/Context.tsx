"use client";
import React, { createContext, useEffect, useState } from "react";
import { getUser } from "@/supabase/user";
import { User } from "@supabase/supabase-js";

type MyContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  movieData: MovieData[];
  setMovieData: React.Dispatch<React.SetStateAction<MovieData[]>>;
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
};

export const MyContext = createContext<MyContextType>(defaultContextValue);

const Context = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [movieData, setMovieData] = useState<MovieData[]>([]);

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
      value={{ currentUser, setCurrentUser, movieData, setMovieData }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default Context;
