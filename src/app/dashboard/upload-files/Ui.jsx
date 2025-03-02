"use client";
import UploadFormForPdf from "./Form-for-pdf";
import UploadFormForTxt from "./Form-for-txt";
import UploadFormForWord from "./Form-for-word";
import UploadFormForUrl from "./Form-for-url";
import { useState } from "react";
import { useTranslations } from "next-intl";

const UploadFileUi = () => {
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

  return (
    <div className=" flex flex-col mr-10 h-screen w-full items-center justify-center bg-gradient-to-b bg-white">
      <div className="flex gap-10 items-center justify-center">
        <button
          onClick={changeToPDF}
          className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white  
        ${isPDF && `bg-gray-900 text-white`}
        `}
        >
          PFD Files
        </button>

        {/* <button onClick={changeToWORD}
             className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white rounded-b-[50%]
              ${isWORD && `bg-gray-900 text-white`}
              `}
            >
        WORD Files 

        </button> */}

        {/* <button onClick={changeToTXT} 
            className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white rounded-b-[50%]
              ${isTXT && `bg-gray-900 text-white`}
              `}
            >
        .TXT Files 
        </button> */}
        {/* <button onClick={changeToURL} 
            className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white rounded-b-[50%]
              ${isURL && `bg-gray-900 text-white`}
              `}
            >
        Web PDF(URL) 
        </button> */}
      </div>
      <div className="md:flex  justfy-center  items-center">
        {isPDF && <UploadFormForPdf />}
        {isTXT && <UploadFormForTxt />}
        {isWORD && <UploadFormForWord />}
        {isURL && <UploadFormForUrl />}
      </div>
    </div>
  );
};

export default UploadFileUi;
