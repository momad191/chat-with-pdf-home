"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { GiLevelFour } from "react-icons/gi";
import UploadFormForPdf from "./Form-for-pdf";
import UploadFormForTxt from "./Form-for-txt";
import UploadFormForWord from "./Form-for-word";
import UploadFormForCsv from "./Form-for-csv";

const UploadFileUi = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchFiles() {
      try {
        setLoading(true);
        const response = await fetch("/api/files?page=1");
        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  const [isPDF, setIsPDF] = useState(true);
  const [isTXT, setIsTXT] = useState(false);
  const [isWORD, setIsWORD] = useState(false);
  const [isURL, setIsURL] = useState(false);

  const changeToPDF = () => {
    setIsPDF(true);
    setIsTXT(false);
    setIsWORD(false);
    setIsURL(false);
  };

  const changeToWORD = () => {
    setIsPDF(false);
    setIsTXT(false);
    setIsWORD(true);
    setIsURL(false);
  };

  const changeToTXT = () => {
    setIsPDF(false);
    setIsTXT(true);
    setIsWORD(false);
    setIsURL(false);
  };
  const changeToURL = () => {
    setIsURL(true);
    setIsPDF(false);
    setIsTXT(false);
    setIsWORD(false);
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center bg-gray-800 justify-center h-screen w-screen  ">
            <p className="items-center justify-center  text-white font-semibold transform transition-all duration-700 ease-in-out animate-bounce">
               
            <Image
              src="/chatbot.png"
              width={300}
              height={200}
              alt="files-image"
              className="left-0"
            />
          
            </p>
           
          </div>
    );
  }

  if (files.length < 10) {
    return (
      <div className=" flex flex-col  w-[100%] h-screen  items-center justify-center bg-gradient-to-b  bg-white ">
        <div className="flex gap-10 items-center justify-center">
          <button
            onClick={changeToPDF}
            className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white 
        ${isPDF && `bg-gray-900 text-white`}
        `}
          >
            PFD Files
          </button>

          <button
            onClick={changeToWORD}
            className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white  
              ${isWORD && `bg-gray-900 text-white`}
              `}
          >
            WORD Files
          </button>

          <button
            onClick={changeToTXT}
            className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white  
              ${isTXT && `bg-gray-900 text-white`}
              `}
          >
            .TXT Files
          </button>

           <button
            onClick={changeToURL}
            className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white  
              ${isURL && `bg-gray-900 text-white`}
              `}
          >
            .CSV Files
          </button> 
        </div>
        <div className="md:flex  justfy-center  items-center  ">
          {isPDF && <UploadFormForPdf />}
          {isTXT && <UploadFormForTxt />}
          {isWORD && <UploadFormForWord />}
          {isURL && <UploadFormForCsv />}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <p>Take advantage of the features after upgrading</p>
        <Link
          href="/dashboard/upgrade"
          className="flex items-center p-8 text-white rounded-lg bg-green-500 hover:bg-gray-700 hover:text-white transition-all"
        >
          <GiLevelFour className="mr-3" size={18} /> upgrad now
        </Link>
      </div>
    );
  }
};

export default UploadFileUi;
