"use client";
import { motion } from "motion/react";
import React from "react";

type Props = {
  unique: string[];
};

const SideModal = ({ unique }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="sm:w-[30%] w-[50%] h-screen bg-gray-100 absolute top-0 z-5"
    >
      <ul className=" flex flex-col items-center mt-[150px] h-full">
        {unique.map((item, index) => (
          <li
            key={index}
            className="border-b text-left w-[60%] my-2 cursor-pointer hover:bg-gray-200 py-3 "
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SideModal;
