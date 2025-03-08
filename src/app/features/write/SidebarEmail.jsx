"use client";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MdEmail } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { FaArrowsDownToLine } from "react-icons/fa6";
import PromptInput from "./PromptInput";

import { FaRegFaceGrin } from "react-icons/fa6";
import { FaRegFaceGrinSquint } from "react-icons/fa6";
import { FaRegFaceAngry } from "react-icons/fa6";
import { FaRegFaceGrinTears } from "react-icons/fa6";
import { FaRegFaceFrown } from "react-icons/fa6";
import { FaRegFaceGrinStars } from "react-icons/fa6";
import { FaRegFaceGrinHearts } from "react-icons/fa6";
import { FaRegFaceSurprise } from "react-icons/fa6";
import { PiHandshakeLight } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { GrCircleInformation } from "react-icons/gr";
import { TbBulbFilled } from "react-icons/tb";
import { PiMagnifyingGlass } from "react-icons/pi";
import { GoTelescope } from "react-icons/go";
import { HiCursorArrowRipple } from "react-icons/hi2";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiOutlineHandThumbDown } from "react-icons/hi2";

import GetDefaultLanguage from "@/lib/getDefaultLanguage";

const SidebarEmail = ({ isOpen, session }) => {
  const t = useTranslations("SidebarEmail");
  const languages = [
    {
      name: t("English"),
      code: "English",
      flag: "https://flagcdn.com/w40/gb.png",
    },
    {
      name: t("French"),
      code: "French",
      flag: "https://flagcdn.com/w40/fr.png",
    },
    {
      name: t("Spanish"),
      code: "Spanish",
      flag: "https://flagcdn.com/w40/es.png",
    },
    {
      name: t("German"),
      code: "German",
      flag: "https://flagcdn.com/w40/de.png",
    },
    {
      name: t("Arabic"),
      code: "Arabic",
      flag: "https://flagcdn.com/w40/sa.png",
    },
  ];

  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  const [language, setLanguage] = useState("English");
  const [text_type, setText_type] = useState("email");
  const [text_length, setText_length] = useState("short");
  const [tone, setTone] = useState("formal");
  const [use_emoji, setUse_emoji] = useState("with_emoji");

  const [current_language, setCurrent_Language] = useState("");

  useEffect(() => {
    const lang = GetDefaultLanguage();
    setCurrent_Language(lang);
  }, []);

  return (
    <>
      <div
        className={` relative  md:w-full h-screen bg-gray-800 text-white shadow-lg transform transition-transform duration-300 w-84`}
      >
        <PromptInput
          language={language}
          text_type={text_type}
          text_length={text_length}
          tone={tone}
          use_emoji={use_emoji}
        />
      </div>

      {/* SidebarEmail */}
      <div
        className={`relative xl:w-[380px]   md:w-[400px] w-full h-[100%]   bg-gray-800 text-white shadow-lg transform transition-transform duration-300 
          `}
        dir={`${current_language === "ar" ? "rtl" : "ltr"}`}
      >
        <nav className="p-4 space-y-2 items-center   ">
          <div className="justify-center items-center p-2 text-gray-300 rounded-lg     transition-all">
            <div className="relative w-56">
              <h1>
                {t("Output Language:")} {selected.name}
              </h1>{" "}
              {/* Displays selected language code */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full px-4 py-2 text-lg bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={selected.flag}
                    alt={selected.name}
                    width={24}
                    height={16}
                    className="rounded"
                  />
                  <span className="text-black">{selected.name}</span>
                </div>
                <FaChevronDown className="w-5 h-5 text-gray-600" />
              </button>
              {open && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border z-50 rounded-lg shadow-lg overflow-hidden">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      onClick={() => {
                        setSelected(lang); // Updates selected language object
                        setLanguage(lang.code); // Updates state with language code
                        setOpen(false); // Closes dropdown
                      }}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <Image
                        src={lang.flag}
                        alt={lang.code}
                        width={24}
                        height={16}
                        className="rounded"
                      />
                      <span className="text-black">{lang.code}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ///////////////////////////////////////////////////Another factors////////////////////////////////////////////////////// */}

          <div className="flex-col max-h-screen w-full  overflow-y-scroll">
            <div className=" justify-center items-center p-2 text-gray-200 rounded-lg transition-all">
              <div className="relative  ">
                <h1> {t("Text Type:")} </h1>
                <div className="flex items-center justify-center gap-4 mt-1">
                  <button
                    onClick={() => setText_type("email")}
                    className={`flex items-center justify-center gap-2  text-black rounded-2xl px-4 py-2 border border-white 
                      ${text_type === "email" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    {" "}
                    <MdEmail /> {t("Email")}{" "}
                  </button>
                  <button
                    onClick={() => setText_type("masenger")}
                    className={`flex items-center justify-center gap-2 bg-gray-200   text-black rounded-2xl px-4 py-2 border border-white
                       ${
                         text_type === "masenger" ? "bg-sky-500" : "bg-gray-200"
                       }
                      `}
                  >
                    {" "}
                    <FaMessage /> {t("Messenger")}{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative  ">
                <h1> {t("Text Length:")} </h1>
                <div className="flex items-center justify-center gap-1 mt-1 ">
                  <button
                    onClick={() => setText_length("short")}
                    className={`flex items-center justify-center gap-2  text-black rounded-2xl  px-2 py-2 border border-white
                       ${text_length === "short" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    {" "}
                    <FaArrowUpShortWide /> {t("Short")}{" "}
                  </button>
                  <button
                    onClick={() => setText_length("medium")}
                    className={`flex items-center justify-center gap-2 text-black rounded-2xl  px-2 py-2 border border-white
                        ${
                          text_length === "medium"
                            ? "bg-sky-500"
                            : "bg-gray-200"
                        }
                      `}
                  >
                    {" "}
                    <FaArrowsDownToLine /> {t("Medium")}{" "}
                  </button>
                  <button
                    onClick={() => setText_length("long")}
                    className={`flex items-center justify-center gap-2 text-black rounded-2xl  px-2 py-2 border border-white
                        ${text_length === "long" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    {" "}
                    <FaArrowDownWideShort /> {t("Long")}{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative ">
                <h1> {t("Writing Tone:")} </h1>
                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("formal")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                         ${tone === "formal" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    <FaRegFaceGrin /> {t("Formal")}
                  </button>
                  <button
                    onClick={() => setTone("friendly")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                       ${tone === "friendly" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    <FaRegFaceGrinSquint /> {t("Friendly")}
                  </button>
                  <button
                    onClick={() => setTone("brutal")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "brutal" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    <FaRegFaceAngry /> {t("Brutal")}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("persuasive")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                       ${tone === "persuasive" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    <HiCursorArrowRipple /> {t("Persuasive")}
                  </button>
                  <button
                    onClick={() => setTone("expert")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                       ${tone === "expert" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    <GoTelescope /> {t("Expert")}
                  </button>
                  <button
                    onClick={() => setTone("joyful")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                       ${tone === "joyful" ? "bg-sky-500" : "bg-gray-200"}
                      `}
                  >
                    <FaRegFaceGrinTears /> {t("Joyful")}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("inspirational")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "inspirational" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <TbBulbFilled />
                    {t("Inspirational")}
                  </button>
                  <button
                    onClick={() => setTone("informative")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "informative" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <GrCircleInformation /> {t("Informative")}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("thoughtful")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "thoughtful" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <PiMagnifyingGlass /> {t("Thoughtful")}
                  </button>
                  <button
                    onClick={() => setTone("cautionary")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "cautionary" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <IoWarningOutline /> {t("Cautionary")}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("grieved")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "grieved" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <FaRegFaceFrown /> {t("Grieved")}
                  </button>
                  <button
                    onClick={() => setTone("exciting")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "exciting" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <FaRegFaceGrinStars /> {t("Exciting")}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("loving")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "loving" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <FaRegFaceGrinHearts /> {t("Loving")}
                  </button>
                  <button
                    onClick={() => setTone("confident")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "confident" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <PiHandshakeLight /> {t("Confident")}
                  </button>
                  <button
                    onClick={() => setTone("surprised")}
                    className={` text-black rounded-2xl  px-2 py-2 border border-white
                      ${tone === "surprised" ? "bg-sky-500" : "bg-gray-200"}
                     `}
                  >
                    <FaRegFaceSurprise /> {t("Surprised")}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative w-56 ">
                <h1> {t("Use Emoji")} </h1>
                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setUse_emoji("with_emoji")}
                    className={`text-black rounded-2xl  px-2 py-2 border border-white
                      ${
                        use_emoji === "with_emoji"
                          ? "bg-sky-500"
                          : "bg-gray-200"
                      }
                      `}
                  >
                    <HiOutlineHandThumbUp />
                    {t("With emoji")}
                  </button>
                  <button
                    onClick={() => setUse_emoji("no_emoji")}
                    className={`text-black rounded-2xl  px-2 py-2 border border-white
                       ${
                         use_emoji === "no_emoji" ? "bg-sky-500" : "bg-gray-200"
                       }
                      `}
                  >
                    <HiOutlineHandThumbDown /> {t("No emoji")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex-col h-[30px] "> 
    <button className="mt-20 w-full mt-8 bg-[#1abac8] hover:bg-gray-800 hover:text-white text-black font-semibold rounded-2xl  px-2 py-2 border border-white"> SUBMIT ➤ </button>

        </div> */}
        </nav>
      </div>
    </>
  );
};

export default SidebarEmail;
