"use client";
import React from "react";
import Link from "next/link";
import { FaFileUpload } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Home = ({ session }) => {
  const t = useTranslations("Home");

  return (
    <div className="min-h-screen flex flex-col  ">
      {/* Main Section */}
      <main className="flex-grow bg-gradient-to-b bg-white flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          {/* Welcome Text */}

          <h1 className=" mt-5 text-5xl md:text-6xl font-bold text-gray-800 mb-4 transform transition-all duration-700 ease-in-out animate-bounce">
            <p className="rtl:ml-0"> {t("Chat with your files")} </p>
          </h1>
          <p className="text-lg  text-gray-600 mb-8">
            {t(
              "Let AI summarize, find information, translate, transcribe, and get citations from your files in seconds"
            )}
          </p>
          <p className="text-lg  text-gray-600 mb-8">
            {t("Ideal for researchers, students and professionals")}
          </p>

          <div className="flex flex-wrap gap-3 mt-5 mb-5 justify-center items-center">
            <Image
              src="/girl.jpeg"
              width={200}
              height={50}
              alt="files-image"
              className="rounded-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />

            <Image
              src="/scolar.jpg"
              width={200}
              height={50}
              alt="files-image"
              className="rounded-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />

            {/* 
              <Image
              src="/study.png"
              width={200}
              height={50}
              alt="files-image"
              className="rounded-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
          
            <Image
              src="/study2.jpg"
              width={200}
              height={50}
              alt="files-image"
              className="rounded-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
            <Image
              src="/students.jpg"
              width={200}
              height={50}
              alt="files-image"
              className="rounded-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
            <Image
              src="/happy.jpg"
              width={200}
              height={50}
              alt="files-image"
              className="rounded-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            /> */}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-4xl font-bold mb-2 text-gray-800">
                <FaFileUpload />
                {t("Upload your Files")}
              </h3>
              <p className="text-black text-2xl ">
                {t("Easily add your files and start chat them")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-4xl font-bold mb-2 text-gray-800">
                <BsChatFill />
                {t("Ask Questions")}
              </h3>
              <p className="text-black text-2xl">
                {t("Ask AI any question about your document")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-4xl font-bold mb-2 text-gray-800">
                <BsChatDotsFill />

                {t("Get Answers")}
              </h3>
              <p className="text-black text-2xl">
                {t("Get an answer from the document")}
              </p>
            </div>
          </div>
          {session ? (
            <Link href={`/dashboard`}>
              <button className="bg-gray-800 text-white font-bold text-2xl px-6 py-3 rounded-xl  hover:bg-gray-600 transition-all">
                {t("Start Now")}
              </button>
            </Link>
          ) : (
            <Link href={`/register`}>
              <button className="bg-gray-800 text-white font-bold text-2xl px-6 py-3 rounded-xl   hover:bg-gray-600 transition-all">
                {t("Start Now")}
              </button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
