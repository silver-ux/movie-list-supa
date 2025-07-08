import Image from "next/image";
import React from "react";
import { MovieData } from "../context/Context";

type Props = {
  item: MovieData;
  stars: string[];
};

const Card = ({ item, stars }: Props) => {
  return (
    <>
      <h1 className="font-bold h-[4em] overflow-hidden text-ellipsis leading-tight">
        {item.title}
      </h1>
      <Image
        src={item.image_url}
        width={1920}
        height={1080}
        alt="picture"
        priority
        className="object-cover rounded mb-2 md:mb-4 w-full h-[140px] md:h-[160px]"
      />
      <p>
        <small>{item.genre?.join(" / ")}</small>
      </p>
      <p>
        <small>投稿日：{item.created_at.slice(0, 10)}</small>
      </p>
      <p className=" text-2xl">{stars[item.stars - 1]}</p>
    </>
  );
};

export default Card;
