import { z } from "zod";

export const validationSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは６文字以上入力してください"),
});

export const validationSignUp = z.object({
  userName: z
    .string()
    .nonempty("ユーザーネームは必須です")
    .min(2, "最低２文字は入力してください"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは６文字以上入力してください"),
});

export const validationNew = z.object({
  title: z.string().nonempty("タイトルは必須です。"),
  genre: z.array(z.string()).min(1, "1つ以上のジャンルを選択してください。"),
  desc: z.string().nonempty("ストーリーは必須です。"),
  comment: z.string().nonempty("コメントは必須です。"),
  stars: z.string().nonempty("評価をつけてください"),
});
