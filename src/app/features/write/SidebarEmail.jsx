"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MdEmail } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { FaArrowsDownToLine } from "react-icons/fa6";
import PromptInput from "./PromptInput";

const languages = [
  { code: "en", name: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "fr", name: "French", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "es", name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
  { code: "de", name: "German", flag: "https://flagcdn.com/w40/de.png" },
  { code: "ar", name: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
];

const SidebarEmail = ({ isOpen, session }) => {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const t = useTranslations("Sidebar");

  const [language, setLanguage] = useState("");
  const [text_type, setText_type] = useState("");
  const [text_length, setText_length] = useState("");
  const [tone, setTone] = useState("");
  const [use_emoji, setUse_emoji] = useState("");

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
        className={`relative xl:w-[380px]   md:w-[400px] w-full h-screen   bg-gray-800 text-white shadow-lg transform transition-transform duration-300 
          `}
      >
        <nav className="p-4 space-y-2 items-center   ">
          <div className="justify-center items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all">
            <div className="relative w-56">
              <h1>Output Language: {language.toUpperCase()}</h1>{" "}
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
                        setLanguage(lang.name); // Updates state with language code
                        setOpen(false); // Closes dropdown
                      }}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <Image
                        src={lang.flag}
                        alt={lang.name}
                        width={24}
                        height={16}
                        className="rounded"
                      />
                      <span className="text-black">{lang.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex-col maz-h-screen w-full  overflow-y-scroll">
            <div className=" justify-center items-center p-2 text-gray-200 rounded-lg transition-all">
              <div className="relative  ">
                <h1> Text Type: </h1>
                <div className="flex items-center justify-center gap-4 mt-1">
                  <button
                    onClick={() => setText_type("email")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl px-4 py-2 border border-white"
                  >
                    {" "}
                    <MdEmail /> Email{" "}
                  </button>
                  <button
                    onClick={() => setText_type("masenger")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl px-4 py-2 border border-white"
                  >
                    {" "}
                    <FaMessage /> Masenger{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative  ">
                <h1>Text Length:</h1>
                <div className="flex items-center justify-center gap-1 mt-1 ">
                  <button
                    onClick={() => setText_length("short")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    <FaArrowUpShortWide /> Short{" "}
                  </button>
                  <button
                    onClick={() => setText_length("medium")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    <FaArrowsDownToLine /> Medium{" "}
                  </button>
                  <button
                    onClick={() => setText_length("long")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    <FaArrowDownWideShort /> Long{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative ">
                <h1>Writing Tone:</h1>
                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("formal")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Formal{" "}
                  </button>
                  <button
                    onClick={() => setTone("friendly")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Friendly{" "}
                  </button>
                  <button
                    onClick={() => setTone("brutal")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Brutal{" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("persuasive")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Persuasive{" "}
                  </button>
                  <button
                    onClick={() => setTone("expert")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Expert{" "}
                  </button>
                  <button
                    onClick={() => setTone("joyful")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Joyful{" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("inspirational")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Inspirational{" "}
                  </button>
                  <button
                    onClick={() => setTone("informative")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Informative{" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("thoughtful")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Thoughtful{" "}
                  </button>
                  <button
                    onClick={() => setTone("cautionary")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Cautionary{" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("grieved")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Grieved{" "}
                  </button>
                  <button
                    onClick={() => setTone("exciting")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Exciting{" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("loving")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Loving{" "}
                  </button>
                  <button
                    onClick={() => setTone("confident")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Confident{" "}
                  </button>
                  <button
                    onClick={() => setTone("surprised")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    Surprised{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative w-56 ">
                <h1>Use Emoji:</h1>
                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setUse_emoji("with_emoji")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    With emoji{" "}
                  </button>
                  <button
                    onClick={() => setUse_emoji("no_emoji")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    No emoji{" "}
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
