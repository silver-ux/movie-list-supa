"use client";
import { storageUpload } from "@/supabase/storageUpload";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationNew } from "../utils/validationSchema";
import { MyContext } from "../context/Context";

const Page = () => {
  type IFormInput = {
    title: string;
    genre: string[];
    desc: string;
    comment: string;
    stars: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: zodResolver(validationNew),
  });

  const [image, setImage] = useState<File | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const router = useRouter();

  const { currentUser, setCurrentUser, setMovieData } = useContext(MyContext);

  const genres = [
    "アクション",
    "コメディ",
    "歴史",
    "戦争",
    "恋愛",
    "アニメ",
    "ドラマ",
    "犯罪",
    "ミュージカル",
    "ミステリー",
    "日本",
    "SF",
    "アドベンチャー",
    "サスペンス",
    "ホラー",
    "ファンタジー",
  ];

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const url = await storageUpload(image);

    const res = await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        image_url: url,
        id: currentUser?.id,
        name: currentUser?.user_metadata.username,
      }),
    });

    const response = await res.json();
    console.log(response);

    setMovieData(response);

    if (!res.ok) alert("投稿失敗");

    setImage(null);
    router.push("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) {
        console.error("ユーザー情報が入っていません");
        setCurrentUser(null);

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      key="new-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={"/"}
        className="block text-center bg-red-100 py-8 hover:bg-red-300 duration-500 font-bold text-2xl"
      >
        一覧に戻る
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        noValidate
        className="max-w-xl mx-auto p-6 space-y-4"
      >
        <input
          className="border p-2 w-full rounded mb-0"
          type="text"
          placeholder="タイトル"
          {...register("title")}
          required
        />
        <p className=" text-red-600">
          {errors.title?.message as React.ReactNode}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {genres.map((g, index) => (
            <label key={index} className="blcok">
              <input type="checkbox" value={g} {...register("genre")} />
              {g}
            </label>
          ))}
        </div>
        <p className=" text-red-600">
          {errors.genre?.message as React.ReactNode}
        </p>

        <textarea
          className="border p-2 w-full rounded min-h-[120px] mb-0"
          placeholder="本文"
          {...register("desc")}
        />
        <p className=" text-red-600">
          {errors.desc?.message as React.ReactNode}
        </p>
        <textarea
          className="border p-2 w-full rounded min-h-[120px] mb-0"
          placeholder="コメント"
          {...register("comment")}
        />
        <p className=" text-red-600">
          {errors.comment?.message as React.ReactNode}
        </p>
        <input
          type="file"
          required
          className="rounded border-dashed border-1 bg-gray-200 py-2 px-4 cursor-pointer shadow-md"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            if (file) {
              const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
              if (file.size > MAX_FILE_SIZE) {
                alert("ファイルサイズは1MB以下にしてください。");
                e.target.value = "";
                setImage(null);
                return;
              }
            }
            setImage(file);
          }}
          accept="image/*"
        />
        <div>
          <label htmlFor="stars">評価：</label>
          <select
            {...register("stars")}
            className="px-1 py-2 rounded border-1"
            required
          >
            <option value="1">★</option>
            <option value="2">★★</option>
            <option value="3">★★★</option>
            <option value="4">★★★★</option>
            <option value="5">★★★★★</option>
          </select>
        </div>
        <p className=" text-red-600">
          {errors.stars?.message as React.ReactNode}
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer block">
          投稿
        </button>
      </form>
    </motion.div>
  );
};

export default Page;
