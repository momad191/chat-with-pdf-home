"use client";
import SocialLogins from "./SocialLogins";
import { useRouter } from "next/navigation";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const RegistrationFormSocial = ({ session }) => {
  const t = useTranslations("Register");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const name = session?.user?.name;
      const email = session?.user?.email;
      const image = session?.user?.image;
      const password = formData.get("password");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          image,
          password,
        }),
      });

      response.status === 201 && router.push("/dashboard/profile");
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <div className="flex flex-col bg-white items-center justify-center min-h-screen  px-4 sm:px-6 lg:px-6 shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="w-full max-w-md   p-6 space-y-4">
        <Link
          href="/"
          className="flex text-xl gap-4 justify-between items-center bg-gray-800 hover:bg-gray-500 hover:text-white rounded-xl p-4"
        >
          {" "}
          <AiOutlineArrowLeft />
          {t("Home2")}
        </Link>
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          {t("Register")}
        </h2>

        {session?.user?.name && session?.user?.image ? (
          <>
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={72}
              height={72}
              className="rounded-full"
            />
            <h1 className="text-md  my-2 text-black items-center">
              {t("Welcome")} {session?.user?.name}
            </h1>
          </>
        ) : (
          <>
            <Image
              src="/default-avatar.jpg"
              alt="avatar"
              width={72}
              height={72}
              className="rounded-full"
            />
            <h1 className="text-sm my-2 text-black items-center">
              {t("Welcome")} {session?.user?.email}
            </h1>
          </>
        )}

        <div className="relative">
          <label htmlFor="name" className="text-gray-600">
            {" "}
            {t("Name")}
          </label>
          <div className="flex items-center mt-1 ">
            <AiOutlineUser
              className="absolute left-3 text-gray-400"
              size={20}
            />
            <input
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
              type="text"
              defaultValue={session?.user?.name}
              id="name"
              readOnly
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="email" className="text-gray-600">
            {t("Email Address")}{" "}
          </label>
          <div className="flex items-center mt-1">
            <AiOutlineMail
              className="absolute left-3 text-gray-400"
              size={20}
            />
            <input
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
              type="email"
              defaultValue={session?.user?.email}
              id="email"
              readOnly
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="password" className="text-gray-600">
            {t("Password")}
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
        </div>

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
      <SocialLogins />
      <p className="my-3 text-black">
        {t("Already have an account?")}
        <Link href="/login" className="mx-2 underline">
          {t("Go to Login")}
        </Link>
      </p>
    </div>
  );
};

export default RegistrationFormSocial;
