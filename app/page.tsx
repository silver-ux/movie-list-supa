"use client";
import { motion } from "motion/react";
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
};

const Page = () => {
  const [data, setData] = useState<MovieData[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/movies");
      const json = (await response.json()) as MovieData[];
      setData(json);
    };
    fetchData();
  }, []);

  const stars = ["★", "★★", "★★★", "★★★★", "★★★★★"];

  const toggleModalImage = (url: string) => {
    setModalImage((prev) => (prev === url ? null : url));
  };

  return (
    <>
      <Header />
      <div className="max-w-[1300px] w-full mx-auto px-[5%] sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => (
          <motion.div
            animate={{
              y: [80, 0],
              opacity: [0, 1],
              transition: { duration: 1.7 },
            }}
            key={item.id}
            onClick={() => toggleModalImage(item.image_url)}
            className="bg-gray-100 my-4 p-5 opacity-0 rounded hover:bg-gray-200 cursor-pointer"
          >
            <h1 className="font-bold">{item.title}</h1>
            <p>
              <small>投稿日：{item.created_at.slice(0, 10)}</small>
            </p>
            <p className=" text-2xl">{stars[item.stars - 1]}</p>

            {modalImage && (
              <div>
                <div className="w-full h-[150px] rounded mt-10 mb-3 sm:mt-5 relative">
                  <Image
                    src={modalImage}
                    fill
                    alt="picture"
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <Link
                  href={`/movies/${item.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600"
                >
                  詳細情報
                </Link>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Page;
