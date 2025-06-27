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
      className="sm:w-[30%] w-[50%] h-screen bg-gray-100 fixed top-0 z-10"
    >
      <ul className=" flex flex-col items-center mt-[150px]">
        {unique.map((item, index) => (
          <li
            key={index}
            className="underline underline-offset-2 text-left w-[60%] my-2 "
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SideModal;
