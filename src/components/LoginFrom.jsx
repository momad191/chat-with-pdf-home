"use client";

import SocialLogins from "./SocialLogins";
import { doCredentialLogin } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineArrowLeft,
  AiFillHome,
} from "react-icons/ai";
import Link from "next/link";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const t = useTranslations("Login");

  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className="flex flex-col bg-white items-center justify-center min-h-screen  px-4 sm:px-6 lg:px-6 shadow-md ">
      <div className="text-xl text-red-500 mb-4">{error}</div>
      <form className="w-full max-w-md   p-6 space-y-4" onSubmit={onSubmit}>
        <Link
          href="/"
          className="flex text-xl gap-4 justify-between items-center bg-sky-500 hover:bg-gray-700 hover:text-white rounded-xl p-4"
        >
          {" "}
          <AiOutlineArrowLeft />
          {t("Home")} <AiFillHome />
        </Link>

        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          {t("Login")}
        </h2>

        <div className="relative">
          <label htmlFor="email" className="text-gray-600">
            {" "}
            {t("Email Address")}{" "}
          </label>
          <div className="flex items-center mt-1">
            <AiOutlineMail
              className="absolute left-3 text-gray-400"
              size={20}
            />
            <input
              type="email"
              name="email"
              id="email"
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="password" className="text-gray-600">
            {" "}
            {t("Password")}{" "}
          </label>
          <div className="flex items-center mt-1">
            <AiOutlineLock
              className="absolute left-3 text-gray-400"
              size={20}
            />
            <input
              type="password"
              name="password"
              id="password"
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
        >
          {t("Credential Login")}
        </button>

        <div className="text-center text-gray-800 font-bold mt-4">
          {t("Or login with:")}
        </div>
      </form>
      <SocialLogins />

      <p className="my-3 text-black">
        {t("Don not you have an account?")}
        <Link href="register" className="mx-2 underline font-bold">
          {" "}
          {t("Register")}{" "}
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
