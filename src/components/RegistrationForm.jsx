"use client";
import SocialLogins from "./SocialLogins";
// import { useRouter } from "next/navigation";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineArrowLeft,
  AiFillHome,
} from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";

const RegistrationForm = () => {
  const t = useTranslations("Register");
  const YOUR_RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [captchaValue, setCaptchaValue] = useState(null);
  const [message, setMessage] = useState("");
  const [message201, setMessage201] = useState("");
  // const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA");
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          captcha: captchaValue,
        }),
      });

      if (response.status === 201) {
        setMessage201("thank you for your registration");
        // router.push('/login');
      } else if (response.status === 401) {
        setMessage("The email you chose already exists");
      }
    } catch (e) {
      console.error(e.message);
    }
  }
 
  return (
    <div className="flex flex-col bg-white items-center justify-center min-h-screen  px-4 sm:px-6 lg:px-6  rounded-lg">
      <form onSubmit={handleSubmit} className="w-full max-w-md   p-6 space-y-4">
        <Link
          href="/"
          className="flex text-xl gap-4 justify-between items-center bg-sky-500 hover:bg-gray-700 hover:text-white rounded-xl p-4"
        >
          {" "}
          <AiOutlineArrowLeft /> {t("Home2")} <AiFillHome />
        </Link>
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          {" "}
          {t("Register")}
        </h2>
        {message201 === "" ? (
          <>
            <div className="relative">
              <label htmlFor="name" className="text-gray-600">
                {" "}
                {t("Name")}{" "}
              </label>
              <div className="flex items-center mt-1">
                <AiOutlineUser
                  className="absolute left-3 text-black"
                  size={20}
                />
                <input
                  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="text-gray-600">
                {" "}
                {t("Email Address")}{" "}
              </label>
              <div className="flex items-center mt-1">
                <AiOutlineMail
                  className="absolute left-3 text-black"
                  size={20}
                />
                <input
                  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  required
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
                  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {message === "" ? (
                <> </>
              ) : (
                <div className="bg-red-500 text-white p-2 mt-2 rounded-md">
                  {message}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
            {message201}
          </div>
        )}
        <ReCAPTCHA
          sitekey={YOUR_RECAPTCHA_SITE_KEY}
          onChange={setCaptchaValue}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
        >
          {t("Register")}
        </button>

        <div className="text-center text-gray-800 font-bold mt-4">
          {" "}
          {t("Or register with")}
        </div>
      </form>
      <SocialLogins t={t} />
      <p className="my-3 text-black">
        {t("Already have an account?")}
        <Link href="/login" className="mx-2 underline font-bold">
          {t("Go to Login")}
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
