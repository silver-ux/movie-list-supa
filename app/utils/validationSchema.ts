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

// export const validationNew = z.object({
//   title: z.string().nonempty("タイトルは必須です。"),
//   name: z.string().nonempty
//   desc: z.string().
// });
