"use client";
import Link from "next/link";
import Image from "next/image"; 
import { useEffect, useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { useTranslations } from "next-intl";

const FilesTable = () => {
  const t = useTranslations("Files");
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

  if (files.length < 1) {
    return (
      <div className="xl:flex md:flex bg-gray-800 text-black items-center justify-center h-screen w-full">
  
        <div className="items-center justify-center    ">
          <h1 className="text-2xl font-bold mb-4"> {t("No files uploaded")}</h1>
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-all">
              {t("Upload your files now")}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:flex md:flex bg-gray-800 text-white items-center justify-center h-screen w-full">
   
      <div className="px-4 py-6 h-screen w-full">
        <h1 className="text-2xl font-bold mb-4">
          {t("Files")} ({files.length})
        </h1>
        <div className="">
          <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-md">
            <thead className="border border-white">
              <tr>
                <th className="p-3 text-left"> {t("Created")} </th>
                <th className="p-3 text-left"> {t("Title")} </th>
                <th className="p-3 text-left"> {t("Chat")} </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file._id}
                  className="  transition-all border-b border-gray-300"
                >
                  <td className="p-3">
                    {new Date(file.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{file.file_name}  </td>
                  <td className="p-3">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all"
                      onClick={() =>
                        window.open(`/features/pdf/${file._id}`, "_blank")
                      }
                    >
                      <IoMdChatboxes /> {t("Chat")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilesTable;
