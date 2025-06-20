import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Response) {
  const supabase = await createClient();

  const { title, desc, name, comment, stars, image_url } = await req.json();
  // const all = await req.json();

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
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
