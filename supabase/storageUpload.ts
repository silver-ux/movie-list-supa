"use server";
import { supaClient } from "./server";

export const storageUpload = async (image: File | null): Promise<string> => {
  if (!image) throw new Error("画像を選択してください");

  const supabase = await supaClient();

  const filePath = `images/${Date.now()}_${image.name}`;

  const { data: storageData, error: storageErr } = await supabase.storage
    .from("movies-images")
    .upload(filePath, image);

  if (storageErr) {
    console.error("アップロード失敗:", storageErr.message);
  } else {
    console.log("アップロード成功:", storageData);
  }

  const { data: signedUrlData, error: signedUrlErr } = await supabase.storage
    .from("movies-images")
    .createSignedUrl(filePath, 60 * 60);

  if (signedUrlErr) {
    console.error("Signed URL取得失敗:", signedUrlErr.message);
    throw new Error("画像URL取得失敗");
  }

  return signedUrlData.signedUrl;
};
