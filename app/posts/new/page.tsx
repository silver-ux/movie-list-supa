"use client";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <input
        className="border p-2 w-full rounded"
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full rounded"
        type="text"
        placeholder="ユーザーネーム"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border p-2 w-full rounded min-h-[120px]"
        placeholder="本文（省略可）"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
      >
        {loading ? "送信中…" : "投稿"}
      </button>
    </form>
  );
};

export default Page;
