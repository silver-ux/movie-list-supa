"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type MovieData = {
  comment: string;
  created_at: string;
  desc: string;
  id: number;
  image_url: string;
  name: string;
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
      console.log(json);
    };
    fetchData();
  }, []);

  const stars = ["★", "★★", "★★★", "★★★★", "★★★★★"];

  const toggleModalImage = (url: string) => {
    setModalImage((prev) => (prev === url ? null : url));
  };

  return (
    <div className="max-w-[1300px] w-full mx-auto px-[5%] sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((item) => (
        <div key={item.id} className="bg-gray-100 my-4 p-5 rounded">
          <div
            onClick={() => toggleModalImage(item.image_url)}
            className="cursor-pointer"
          >
            <h1 className="font-bold">{item.title}</h1>
            <p>
              <small>投稿日：{item.created_at.slice(0, 10)}</small>
            </p>
            <p className=" text-2xl">{stars[item.stars - 1]}</p>
          </div>
          {modalImage && (
            <div>
              <div className="w-full h-[200px] rounded mt-10 mb-3 sm:mt-5 relative">
                <Image
                  src={modalImage}
                  fill
                  alt="picture"
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <Link href={`/movies/${item.id}`} className="text-blue-600">
                詳細情報
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page;
