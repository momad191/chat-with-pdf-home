"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GrUpdate } from "react-icons/gr";
import { useRouter } from "next/navigation";

export default function PromptInput({
  language,
  text_type,
  text_length,
  tone,
  use_emoji,
}) {
  const router = useRouter();
  const maxChars = 1000;

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const sendMessage = async () => {
    if (prompt.trim()) {
      setMessages(null);
      setLoading(true);
      setComplete(false);

      try {
        const response = await fetch("/api/write-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text1: prompt,
            language,
            text_type,
            text_length,
            tone,
            use_emoji,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch response");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          result += decoder.decode(value, { stream: true });

          try {
            const parsed = JSON.parse(result);
            setMessages(parsed); // Update messages as chunks arrive
          } catch (error) {
            // Ignore JSON parse errors while streaming
          }
        }

        setLoading(false);
        setComplete(true);
      } catch (error) {
        console.error("Error fetching response:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full p-4 max-h-screen ">
      {loading && (
        <div className="xl:flex md:flex bg-gray-800 text-white items-center justify-center max-h-screen w-full">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      )}

      {complete && messages ? (
        <div className="relative w-full items-center text-black">
          <div className="mt-6 p-4 border rounded bg-gray-50" dir="rtl">
            <h3 className="text-lg font-bold">
              <strong>الموضوع:</strong> {messages.subject}
            </h3>
            <p>{messages.greeting}</p>
            <p>{messages.message_body}</p>
            <p>{messages.signature}</p>
          </div>

          <button
            onClick={sendMessage}
            className="mt-4 w-full flex items-center justify-center gap-2 border border-white font-semibold px-4 py-2 text-black rounded-lg transition bg-[#1abac8] hover:bg-gray-500 cursor-pointer"
            disabled={!prompt.trim()}
          >
            <GrUpdate /> Re-write
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-full">
            <textarea
              className="w-full h-[450px] p-4 bg-gray-800 text-white text-xl border border-gray-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder=""
              maxLength={maxChars}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>

            <motion.label
              initial={{ opacity: 0.5, y: 10 }}
              animate={{ opacity: prompt ? 0.7 : 1, y: prompt ? -10 : 0 }}
              className={`absolute top-4 left-4 text-gray-400 transform transition-all duration-700 ease-in-out animate-bounce 
            ${prompt === "" ? "" : "hidden"}`}
            >
              <h1>Example:</h1>
              <p>
                Hi team, let's share a coffee together and start our meeting.
              </p>
            </motion.label>

            <div className="absolute bottom-2 right-4 text-sm text-gray-500">
              {prompt.length}/{maxChars}
              <p>
                {"/"}
                {language} {text_type} {text_length} {tone} {use_emoji}
              </p>
            </div>
          </div>

          <button
            onClick={sendMessage}
            className={`mt-4 w-full flex items-center justify-center gap-2 border border-white rounded-xl font-semibold px-4 py-2 text-black transition ${
              prompt.trim()
                ? "bg-[#1abac8] hover:bg-gray-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!prompt.trim()}
          >
            Generate Email ➤
          </button>
        </>
      )}
    </div>
  );
}
