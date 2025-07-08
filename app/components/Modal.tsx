import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { MovieData } from "../context/Context";
import Link from "next/link";

type Props = {
  modalItem: MovieData;
  stars: string[];
};

const Modal = ({ modalItem, stars }: Props) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded shadow-lg min-w-[60%] md:min-w-[685px] max-w-[90%] md:max-w-[max-h-[90%] overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-black rounded">
        <Image
          src={modalItem.image_url}
          width={1920}
          height={1080}
          alt="picture"
          className="object-contain rounded mb-4 w-full h-[270px] "
        />
      </div>
      <p className="text-xl font-bold">{modalItem.title}</p>
      <p className="underline underline-offset-2">
        {modalItem.genre?.join(" / ")}
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
  );
};

export default Modal;
