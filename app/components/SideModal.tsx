"use client";
import { motion } from "motion/react";
import React, { useContext } from "react";
import { MyContext } from "../context/Context";

type Props = {
  unique: string[];
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideModal = ({ unique, setHamburger }: Props) => {
  const { setShowMyList, setGenreSelected, currentUser } =
    useContext(MyContext);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-black/50 w-screen h-screen fixed inset-0"
      onClick={() => setHamburger(false)}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="sm:w-[30%] w-[50%] h-screen bg-gray-100 absolute top-0 z-5"
      >
        <ul className=" flex flex-col items-center mt-[150px] h-full">
          {currentUser && (
            <li
              onClick={() => setShowMyList(true)}
              className="border-b text-left w-[60%] my-2 cursor-pointer
            hover:bg-gray-200 py-3"
            >
              マイリスト
            </li>
          )}
          <li
            onClick={() => {
              setShowMyList(false);
              setGenreSelected("");
            }}
            className="border-b text-left w-[60%] my-2 cursor-pointer hover:bg-gray-200 py-3 "
          >
            All
          </li>

          {unique.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setShowMyList(false);
                setGenreSelected(item);
              }}
              className="border-b text-left w-[60%] my-2 cursor-pointer hover:bg-gray-200 py-3 "
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default SideModal;
