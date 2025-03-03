"use client"; 
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { BsFiletypeTxt } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";


export default function UploadFormForTxt() {
  const t = useTranslations("UploadFormForPdf");
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "application/txt": [".txt"] },
      maxFiles: 1,
    });
 
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
      const res = await fetch("/api/upload-file/txt", {
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
    <div className="bg-white p-50">
      <form
        onSubmit={onSubmit}
        className="bg-white text-gray-800 rounded-lg shadow-lg p-8  flex-col gap-4 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center flex items-center gap-2">
          <BsFiletypeTxt className="text-red-500" />
          {t("Upload your")}{" "}
          <span className="text-sky-500">.TXT File</span>
        </h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 rounded-lg cursor-pointer transition ${
            isDragActive
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300 bg-gray-50"
          }  flex-col items-center justify-center text-gray-600 hover:border-sky-500 hover:bg-gray-100`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-gray-700 font-semibold">{file.name}</p>
          ) : isDragActive ? (
            <p className="text-blue-500">{t("Drop the file here")}</p>
          ) : (
            <p>{t("Drag & drop your TXT file here")}</p> 
          )}
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full mt-5 py-3 rounded-md text-white font-semibold transition ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600"
          } flex justify-center items-center gap-2`}
        >
          {isUploading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 border-white border-t-2 border-l-2 rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              {t("Please wait until")}
            </>
          ) : (
            t("Creat chat")
          )}
        </button>
      </form>

      {responseMessage && (
        <div
          className={`mt-4 p-4 rounded-lg shadow-md text-center max-w-lg w-full ${
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
