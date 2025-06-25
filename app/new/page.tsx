"use client";
import { storageUpload } from "@/supabase/storageUpload";
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

const Page = () => {
  type Data = {
    title: string;
    desc: string;
    name: string;
    comment: string;
    stars: string;
    image_url: string;
  };
  const [form, setForm] = useState<Data>({
    title: "",
    desc: "",
    name: "",
    comment: "",
    stars: "3",
    image_url: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

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
  };
  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

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
    });
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setImage(null);
    router.push("/");
  };
  return (
    <>
      <Header />
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
    </>
  );
};

export default Page;
