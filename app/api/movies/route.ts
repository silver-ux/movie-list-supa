import { supaClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await supaClient();

  const { title, desc, name, comment, stars, image_url, genre } =
    await req.json();

  if (!title)
    return NextResponse.json({ error: "titleは必須です" }, { status: 400 });

  const { data, error } = await supabase
    .from("movies")
    .insert({
      title,
      desc,
      name,
      comment,
      stars,
      image_url,
      genre,
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}

export async function GET() {
  const supabase = await supaClient();

  const { data, error } = await supabase
    .from("movies")
    .select("created_at, id, image_url, title, stars, name, genre")
    // .eq("user_id", user)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
