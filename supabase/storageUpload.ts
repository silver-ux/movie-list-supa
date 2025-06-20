"use server";
import { createClient } from "./server";

export const storageUpload = async (image: File | null): Promise<string> => {
  if (!image) throw new Error("画像を選択してください");

  const supabase = await createClient();

  const filePath = `images/${Date.now()}_${image.name}`;

  const { data: storageData, error: storageErr } = await supabase.storage
    .from("movies-images")
    .upload(filePath, image);

  if (storageErr) {
    console.error("アップロード失敗:", storageErr.message);
  } else {
    console.log("アップロード成功:", storageData);
  }

  const { data: urlData } = supabase.storage
    .from("movies-images")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};
