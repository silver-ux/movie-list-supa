"use client";
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/movies");
      const json = (await response.json()) as MovieData[];
      setData(json);
      console.log(json);
    };
    fetchData();
  }, []);
  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default Page;
