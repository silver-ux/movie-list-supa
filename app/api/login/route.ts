import { supaClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await supaClient();

  const { email, password } = await req.json;

  if (!email)
    return NextResponse.json({ error: "emailは必須です" }, { status: 400 });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: datas, error: Err } = await supabase.auth.getUser();
  if (Err) return NextResponse.json({ error: Err.message }, { status: 500 });
  return NextResponse.json(datas, { status: 201 });
}
