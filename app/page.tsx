"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";

type MovieData = {
  created_at: string;
  id: number;
  image_url: string;
  stars: number;
  title: string;
  name: string;
  genre: string[];
};

const Page = () => {
  const [data, setData] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<MovieData | null>(null);

  const toggleModal = (item: MovieData) => {
    setModalItem((prev) => (prev?.id === item.id ? null : item));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/movies");
      const json = (await response.json()) as MovieData[];
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const stars = ["★", "★★", "★★★", "★★★★", "★★★★★"];

  return (
    <>
      <Header />
      <div className="max-w-[1300px] w-full mx-auto px-[5%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[1fr]">
        {data.map((item, index) =>
          loading ? null : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              key={item.id}
              onClick={() => toggleModal(item)}
              className="bg-gray-100 p-5 rounded hover:bg-gray-200 duration-500 cursor-pointer"
            >
              <h1 className="font-bold h-[4em] overflow-hidden text-ellipsis leading-tight">
                {item.title}
              </h1>
              <Image
                src={item.image_url}
                width={1920}
                height={1080}
                alt="picture"
                className="object-cover rounded mb-2 md:mb-4 w-full h-[100px] md:h-[150px]"
              />
              <p>
                <small>{item.genre.join(" / ")}</small>
              </p>
              <p>
                <small>投稿日：{item.created_at.slice(0, 10)}</small>
              </p>
              <p className=" text-2xl">{stars[item.stars - 1]}</p>
            </motion.div>
          )
        )}

        <AnimatePresence>
          {modalItem && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setModalItem(null)} // 外クリックで閉じる
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded shadow-lg max-w-[90%] max-h-[90%] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={modalItem.image_url}
                  width={600}
                  height={400}
                  alt="picture"
                  className="object-cover rounded mb-4 w-full h-auto"
                />
                <p className="text-xl font-bold">{modalItem.title}</p>
                <p className="underline underline-offset-2">
                  {modalItem.genre.join(" / ")}
                </p>
                <p>
                  <small>投稿者：{modalItem.name}</small>
                </p>
                <p>
                  <small>投稿日：{modalItem.created_at.slice(0, 10)}</small>
                </p>
                <p className=" text-2xl">{stars[modalItem.stars - 1]}</p>
                <Link
                  href={`/movies/${modalItem.id}`}
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  詳細情報へ
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Page;
