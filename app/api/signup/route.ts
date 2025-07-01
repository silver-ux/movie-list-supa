import { supaClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await supaClient();
  try {
    const body = await req.json(); // JSONをパース

    const { error: Err } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        data: {
          username: body.userName,
        },
      },
    });
    if (Err) return alert("問題が発生しました。");
    return NextResponse.json({ message: `こんにちは、${body.userName}さん！` });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
