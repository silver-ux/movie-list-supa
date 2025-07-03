import { supaClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await supaClient();
    const body = await req.json();

    const { data, error: Err } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });
    if (Err) return alert("問題が発生しました。");
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
