"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegFileWord } from "react-icons/fa";


export default function UploadFormForWord() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setResponseMessage("Please select a file to upload.");
      return;
    }
    setIsUploading(true);
    setResponseMessage(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload-file/word", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setResponseMessage(`File uploaded successfully! URL: ${result.url}`);
        router.push("/dashboard/files");
      } else {
        setResponseMessage(`Error: ${result.error || "Upload failed"}`);
      }
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center  min-h-screen">
      <form
        onSubmit={onSubmit}
        className="bg-white text-gray-800 rounded-lg shadow-md p-10 flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">  <FaRegFileWord className="bg-white text-gray-900"/>   Upload your <span className="bg-sky-500 p-2 rounded text-white text-2xl"> Word File </span> </h2>

        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          disabled={isUploading}
        />

        <button
          type="submit"
          disabled={isUploading}
          className={`text-2xl w-full py-2 flex justify-center items-center rounded-md text-white font-semibold transition ${
            isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
          }`}
        >
          {isUploading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 border-white border-t-2 border-l-2 rounded-full"
                viewBox="0 0 24 24"
              ></svg>
               Please wait until the files have finished uploading...
               Do not close the page!
            </>
          ) : (
            "Creat chat"
          )}
        </button>
      </form>

      {responseMessage && (
        <div
          className={`mt-4 p-4 rounded-lg shadow-lg text-center max-w-md w-full ${
            responseMessage.startsWith("File uploaded successfully!")
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {responseMessage}
        </div>
      )}
    </div>
  );
}
