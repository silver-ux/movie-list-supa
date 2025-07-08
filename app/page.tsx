"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { MovieData, MyContext } from "./context/Context";
import Card from "./components/Card";
import Modal from "./components/Modal";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<MovieData | null>(null);
  const [query, setQuery] = useState("");

  const { currentUser, movieData, setMovieData, showMyList, genreSelected } =
    useContext(MyContext);

  const toggleModal = (item: MovieData) => {
    setModalItem((prev) => (prev?.id === item.id ? null : item));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/movies");
      const json = (await response.json()) as MovieData[];

      setMovieData(json);
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

  const filtered = movieData
    ?.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))
    .filter((post) =>
      showMyList && currentUser ? post.user_id === currentUser?.id : true
    )
    .filter((post) =>
      genreSelected ? post.genre.includes(genreSelected) : true
    );

  return (
    <>
      <Header />
      <input
        type="text"
        className="border block mx-auto py-2 px-3 mb-4 w-[90%] md:w-1/2 "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="タイトルを検索"
      />

      <div className="max-w-[1300px] w-full mx-auto px-[5%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[1fr]">
        {filtered?.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            key={item.id}
            onClick={() => toggleModal(item)}
            className="bg-gray-100 p-5 origin-center rounded hover:bg-gray-200 duration-500 cursor-pointer"
          >
            <Card item={item} stars={stars} />
          </motion.div>
        ))}

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
              <Modal modalItem={modalItem} stars={stars} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Page;
