"use client"
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text1: input }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = { role: "bot", content: data.answer };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          role: "bot",
          content: "Error: Unable to process your request. Please try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        role: "bot",
        content: "Error: Something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <div className="h-96 overflow-y-auto border-b border-gray-200 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-md ${
                msg.role === "user"
                  ? "bg-blue-100 text-blue-800 self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 transition-all duration-300"
          >
            <FaPaperPlane />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
