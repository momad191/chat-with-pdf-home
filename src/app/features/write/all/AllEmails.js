 "use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";

import { useTranslations } from "next-intl";
 
const AllEmails = () => {
  const t = useTranslations("Files");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchEmails() {
      try {
        setLoading(true);
        const response = await fetch("/api/emails?page=1");
        const data = await response.json();
        setEmails(data.emails);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmails();
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

  if (emails.length < 1) {
    return (
      <div className="xl:flex md:flex bg-gray-800 text-black items-center justify-center h-screen w-full">
  
        <div className="items-center justify-center">
          <h1 className="text-2xl font-bold mb-4"> No emails </h1>
          <Link href="/features/write">
            <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-all">
             write new email
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
          emails ({emails.length})
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
              {emails.map((email) => (
                <tr
                  key={email._id}
                  className="  transition-all border-b border-gray-300"
                >
                  <td className="p-3">
                    {new Date(email.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{email.subject}  </td>
                  <td className="p-3">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all"
                      onClick={() =>
                        window.open(`/features/write/all/${email._id}`, "_blank")
                      }
                    >
                      <MdEmail /> Open 
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

export default AllEmails;
