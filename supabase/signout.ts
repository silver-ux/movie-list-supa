"use server";

import { supaClient } from "./server";

export const signout = async () => {
  const supabase = await supaClient();
  const { error } = await supabase.auth.signOut();
  if (error) return console.log(error);
};
