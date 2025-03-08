"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GiLevelFour } from "react-icons/gi";
import UploadFormForPdf from "./Form-for-pdf";
import UploadFormForTxt from "./Form-for-txt";
import UploadFormForWord from "./Form-for-word";
import UploadFormForCsv from "./Form-for-csv";

const UploadFileUi10 = () => {
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
  const [isCSV, setIsCSV] = useState(false);

  const changeToPDF = () => {
    setIsPDF(true);
    setIsTXT(false);
    setIsWORD(false);
    setIsCSV(false);
  };

  const changeToWORD = () => {
    setIsPDF(false);
    setIsTXT(false);
    setIsWORD(true);
    setIsCSV(false);
  };

  const changeToTXT = () => {
    setIsPDF(false);
    setIsTXT(true);
    setIsWORD(false);
    setIsCSV(false);
  };
  const changeToCsv = () => {
    setIsCSV(true);
    setIsPDF(false);
    setIsTXT(false);
    setIsWORD(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-white">
        <p className="text-lg text-black font-semibold">Loading...</p>
      </div>
    );
  }

  if (files.length < 10) {
    return (
      <div className=" flex flex-col  w-full h-screen  items-center justify-center bg-gray-800 ">
        <div className="flex gap-0 mb-10 items-center justify-center">
          <button
            onClick={changeToPDF}
            className={`bg-sky-300 text-black p-2 hover:bg-sky-500 hover:text-white border-r  rounded-tl-xl rounded-bl-xl
        ${isPDF && "bg-sky-800 text-white"}
        `}
          >
            PFD Files
          </button>

          <button
            onClick={changeToWORD}
            className={`bg-sky-300 text-black p-2 hover:bg-sky-500 hover:text-white  border-r  
              ${isWORD && `bg-sky-800 text-white`}
              `}
          >
            WORD Files
          </button>

          <button
            onClick={changeToTXT}
            className={`bg-sky-300 text-black p-2 hover:bg-sky-500 hover:text-white  border-r 
              ${isTXT && `bg-sky-800 text-white`}
              `}
          >
            .TXT Files
          </button>

           <button
            onClick={changeToCsv}
            className={`bg-sky-300 text-black p-2 hover:bg-sky-500 hover:text-white  rounded-tr-xl rounded-br-xl 
              ${isCSV && `bg-sky-800 text-white`}
              `}
          >
            .CSV Files
          </button>
        </div>
        <div className="md:flex  justfy-center  items-center  ">
          {isPDF && <UploadFormForPdf />}
          {isTXT && <UploadFormForTxt />}
          {isWORD && <UploadFormForWord />}
          {isCSV && <UploadFormForCsv />}
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

export default UploadFileUi10;
