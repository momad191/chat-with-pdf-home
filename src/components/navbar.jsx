"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { GrLanguage } from "react-icons/gr";

import GetDefaultLanguage from "../lib/getDefaultLanguage";

import { useTranslations } from "next-intl";

const Navbar = ({ session }) => {
  const t = useTranslations("NavBar");

  const [language, setLanguage] = useState("");

  useEffect(() => {
    const lang = GetDefaultLanguage();
    setLanguage(lang);
  }, []);

  const router = useRouter();

  const setEnglish = async (L) => {
    await Cookies.set("lan", L);
    router.push("/");
    // alert( document.cookie.match(new RegExp("ar|en")));
  };
  const setArabic = async (L) => {
    await Cookies.set("lan", L);
    router.push("/");
    // alert( document.cookie.match(new RegExp("ar|en")));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  // const email = session?.user?.email;

  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-50 ">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center h-15">
        {/* Logo */}
        <Image
          src="/faizbot.webp"
          width={200}
          height={100}
          alt="files-image"
          className="left-0"
        />
        <div className="flex justify-center items-center bg-white text-blue-500">
          {/* {t("Chat with files")} */}
        </div>
        {/* <h1 className="text-2xl font-bold"> {t("Chat with files")} </h1> */}
        {/* Toggle Button */}
        <button
          onClick={toggleNavbar}
          className="md:hidden p-2 rounded text-white bg-gray-800 hover:bg-gray-500 focus:ring-4 focus:ring-gray-500 transition-all"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* Navbar Links */}
        <nav
          className={`fixed inset-0 bg-gray-800 md:static md:bg-transparent md:flex md:items-center md:space-x-6 md:w-auto md:h-auto transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          {/* Toggle Button */}
          <button
            onClick={toggleNavbar}
            className="md:hidden p-2 rounded  text-white bg-gray-800 hover:bg-gray-500 focus:ring-4 focus:ring-gray-500 transition-all"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <ul
            className={`flex flex-col md:flex-row md:space-x-6 text-2xl font-bold  justify-center items-center gap-4 ${
              isOpen ? "text-white" : "text-black"
            }`}
          >
            <li>
              <Link
                href="/"
                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
              >
                {t("Home")}
              </Link>
            </li>

            <li>
              <Link
                href="/pricing"
                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
              >
                {t("Pricing")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
              >
                {t("Contact")}
              </Link>
            </li>

            {/* Features with Dropdown */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex justify-center items-center gap-1 py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
              >
                <GrLanguage /> {language}
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-gray-700 text-white rounded shadow-md w-48">
                  <li>
                    <a
                      onClick={() => {
                        setEnglish("en");
                      }}
                      href="/"
                      className="block px-4 py-2 hover:bg-gray-600 transition-colors"
                    >
                      {" "}
                      English{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setArabic("ar");
                      }}
                      href="/"
                      className="block px-4 py-2 hover:bg-gray-600 transition-colors"
                    >
                      {" "}
                      عربي{" "}
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        {/* Right Buttons */}
        {session ? (
          <div className="md:flex space-x-4">
            <Link href="/dashboard">
              <button className="flex items-center justify-center gap-2 px-8 py-2 bg-gray-800 text-xl  text-white  rounded hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 transition-all">
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    alt={session?.user?.name}
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                ) : (
                  <FaUserCircle />
                )}

                {t("Dashboard")}
              </button>
            </Link>
          </div>
        ) : (
          <div className="sm:flex space-x-4 items-center justify-center">
            {/* <Link href="/login">
              <button className="px-4 py-2 text-xl bg-gray-800 text-white rounded hover:bg-gray-500 focus:ring-4 focus:ring-gray-500 transition-all">
                {t("Login")}
              </button>
            </Link> */}
            <Link href="/register">
              <button className="px-4 py-2 text-xl bg-gray-800 text-white rounded hover:bg-gray-500 focus:ring-4 focus:ring-blue-300 transition-all">
                {t("Try for Free")}
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Dropdown for smaller screens */}
      {isOpen && (
        <div className="flex flex-col md:hidden space-y-2 px-4 pb-4 items-center justify-center">
          {/* <Link href="/login">
            <button className="w-full px-4 py-2 text-4xl bg-gray-800 text-white rounded hover:bg-gray-500 transition-all">
              {t("Login")}
            </button>
          </Link> */}
          <Link href="/register">
            <button className="w-full px-4 py-2 text-4xl bg-gray-800 text-white rounded hover:bg-gray-500 transition-all">
              {t("Try for Free")}
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
