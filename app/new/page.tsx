"use client";
import { storageUpload } from "@/supabase/storageUpload";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const Page = () => {
  type Data = {
    title: string;
    desc: string;
    name: string;
    comment: string;
    stars: string;
    image_url: string;
    genre: string[];
  };
  const [form, setForm] = useState<Data>({
    title: "",
    desc: "",
    name: "",
    comment: "",
    stars: "3",
    image_url: "",
    genre: [],
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;

    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };
  // useEffect(() => {
  //   console.log(form.genre);
  // }, [form]);

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "genre") {
      setForm((prev) => {
        const genreList = prev.genre as string[];

        if (checked) {
          // チェックされた → 配列に追加（重複防止）
          return {
            ...prev,
            genre: [...genreList, value],
          };
        } else {
          // チェック外された → 配列から削除
          return {
            ...prev,
            genre: genreList.filter((item) => item !== value),
          };
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = await storageUpload(image);
    form.image_url = url;

    const res = await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) alert("投稿失敗");

    setForm({
      title: "",
      desc: "",
      name: "",
      comment: "",
      stars: "3",
      image_url: "",
      genre: [],
    });
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setImage(null);
    router.push("/");
  };
  return (
    <motion.div
      key="new-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
        <input
          className="border p-2 w-full rounded"
          type="text"
          name="title"
          placeholder="タイトル"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full rounded"
          type="text"
          name="name"
          placeholder="ユーザーネーム"
          value={form.name}
          required
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 md:grid-cols-3">
          {genres.map((g, index) => (
            <label key={index} className="blcok">
              <input
                type="checkbox"
                name="genre"
                value={g}
                onChange={handleCheckBox}
              />
              {g}
            </label>
          ))}
        </div>

        <textarea
          className="border p-2 w-full rounded min-h-[120px]"
          placeholder="本文（省略可）"
          name="desc"
          value={form.desc}
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full rounded min-h-[120px]"
          placeholder="コメント（省略可）"
          name="comment"
          value={form.comment}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          ref={inputFileRef}
          className="rounded border-dashed border-1 bg-gray-200 py-2 px-4 cursor-pointer shadow-md"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setImage(file);
          }}
          accept="image/*"
        />
        <div>
          <label htmlFor="stars">評価：</label>
          <select
            name="stars"
            id="stars"
            value={form.stars}
            onChange={handleChange}
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
        <button
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer block"
        >
          {loading ? "送信中…" : "投稿"}
        </button>
      </form>
    </motion.div>
  );
};

export default Page;
