import { createClient } from "@/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabase = await createClient();

  const { data: movie, error } = await supabase
    .from("movies")
    .select("*") // 詳細なので全部ほしい例
    .eq("id", Number(id))
    .single();

  if (error || !movie) return notFound();
  return (
    <article className="max-w-[1300px] w-full mx-auto px-[5%] py-20 text-center">
      <h1 className="font-bold text-2xl border-b-1 md:text-3xl">
        {movie.title}
      </h1>
      <p className="py-3">投稿者：{movie.name}</p>
      <p className="text-lg font-bold">
        ★ {movie.stars} / 5 ・投稿:{" "}
        {new Intl.DateTimeFormat("ja-JP", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(movie.created_at))}
      </p>

      <Image
        src={movie.image_url}
        width={1920}
        height={1080}
        alt={movie.title}
        priority
        className="rounded"
      />
      <div className="mt-5 p-5 md:p-10 bg-gray-50">
        <div className="md:w-[80%] mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl">STORY</h2>
          <p className="mt-4 text-justify md:text-[20px]">{movie.desc}</p>
        </div>
      </div>
      <div className="mt-5 p-5 md:p-10 mb-5 bg-gray-50">
        <div className="md:w-[80%] mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl">COMMENT</h2>
          <p className="mt-4 text-justify md:text-[20px]">{movie.comment}</p>
        </div>
      </div>

      <Link href={"/"} className="text-blue-600">
        一覧へ戻る
      </Link>
    </article>
  );
};

export default page;
