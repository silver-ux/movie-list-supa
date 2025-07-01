"use server";
import { supaClient } from "./server";

export const getUser = async () => {
  const supabase = await supaClient();
  const { data, error: userErr } = await supabase.auth.getUser();

  return {
    user: data.user,
    error: userErr?.message ?? null,
  };
};
