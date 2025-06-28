"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { validationSchema } from "../utils/validationSchema";
import { motion } from "motion/react";

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className=" h-screen w-screen px-[5%] flex items-center justify-center "
    >
      <div className="bg-gray-100 rounded-2xl w-full max-w-[700px] h-[600px] ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-15 w-full h-full"
        >
          <h2 className="mt-10 mb-7 font-bold text-2xl text-center">LOGIN</h2>
          <label htmlFor="メールアドレス">メールアドレス</label>
          <input
            type="email"
            className="border block w-full rounded p-3 sm:p-4 mt-2 bg-white"
            {...register("email")}
          />
          <p className=" text-red-600">
            {errors.email?.message as React.ReactNode}
          </p>
          <label htmlFor="パスワード" className="block mt-6  sm:mt-10">
            パスワード
          </label>
          <input
            type="password"
            className="border block w-full rounded p-3 sm:p-4 mt-2 bg-white"
            {...register("password")}
          />
          <p className=" text-red-600">
            {errors.password?.message as React.ReactNode}
          </p>
          <button
            type="submit"
            className="block w-[30%] mx-auto text-center mt-10 cursor-pointer py-5 bg-sky-200 rounded-2xl duration-500  hover:bg-sky-300 active:bg-sky-800"
          >
            ログイン
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginPage;
