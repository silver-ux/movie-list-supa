import { supaClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await supaClient();

  const body = await req.json();

  const { data, error } = await supabase
    .from("movies")
    .insert({
      title: body.title,
      desc: body.desc,
      comment: body.comment,
      stars: body.stars,
      image_url: body.image_url,
      genre: body.genre,
      user_id: body.id,
      name: body.name,
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}

export async function GET() {
  const supabase = await supaClient();

  const { data: userMovie, error: userErr } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false });
  if (userErr)
    return NextResponse.json({ error: userErr.message }, { status: 500 });
  return NextResponse.json(userMovie, { status: 200 });
}

// } else {
//   console.error(userErr);
//   const { data, error } = await supabase
//     .from("movies")
//     .select("created_at, id, image_url, title, stars, name, genre")
//     // .eq("user_id", user)
//     .order("created_at", { ascending: false });

//   if (error)
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   return NextResponse.json(data, { status: 200 });
// }
