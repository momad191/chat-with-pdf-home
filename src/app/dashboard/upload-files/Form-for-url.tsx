"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLink } from "react-icons/fa6";

export default function UploadFormForUrl() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setResponseMessage("Please enter a valid URL.");
      return;
    }

    setIsSubmitting(true);
    setResponseMessage(null);
   
    try {
      const res = await fetch("/api/upload-file/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const result = await res.json();
      if (result.success) {
        setResponseMessage(`URL submitted successfully!`);
        router.push("/dashboard/files");
      } else {
        setResponseMessage(`Error: ${result.error || "Submission failed"}`);
      }
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={onSubmit}
        className="bg-white text-gray-800 rounded-lg shadow-md p-10 flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">
          <FaLink className="bg-white text-gray-900" /> Enter your
          <span className="bg-sky-500 p-2 rounded text-white text-2xl"> PDF URL </span>
        </h2>

        <input
          type="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="put URL"
          className="block w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`text-2xl w-full py-2 flex justify-center items-center rounded-md text-white font-semibold transition ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 border-white border-t-2 border-l-2 rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Submitting...
            </>
          ) : (
            "Create Chat"
          )}
        </button>
      </form>

      {responseMessage && (
        <div
          className={`mt-4 p-4 rounded-lg shadow-lg text-center max-w-md w-full ${
            responseMessage.startsWith("URL submitted successfully!")
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
