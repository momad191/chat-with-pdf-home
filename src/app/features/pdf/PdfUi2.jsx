"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { Chat } from "./pdfAction";

function PdfUi2({ file_id, chat_data }) {
  const [file, setFile] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: "user", text: input }];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const response = await Chat(input, file.file_name, file_id);
        setLoading(false);

        // Show typing effect by splitting response text
        let index = 0;
        const responseText = { sender: "bot", text: "" };
        const streamInterval = setInterval(() => {
          if (index < response.length) {
            responseText.text += response[index];
            setMessages((prevMessages) => [
              ...prevMessages.slice(0, -1),
              responseText,
            ]);
            index++;
          } else {
            clearInterval(streamInterval);
          }
        }, 10);

        setMessages((prevMessages) => [...prevMessages, responseText]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleEnterKey = (event) => {
    if (event.key === "Enter") sendMessage();
  };

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(`/api/file?id=${file_id}`);
        const data = await response.json();
        setFile(data.file);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }

    fetchFiles();
  }, []);

  return (
    <div className="flex bottom-4 right-4">
      <iframe src={`${file.file_url}`} className="w-[50%] h-screen"></iframe>

      <div className=" w-[50%] h-screen bg-[#27272c] text-white   shadow-lg flex flex-col transition-all duration-500">
        <header className="flex justify-between p-3 border-b border-black">
          <div className="flex flex-row items-center justify-start ">
            <Image
              src="/chatbot.png"
              width={50}
              height={50}
              alt="momad image"
              className="rounded-xl mr-3 mt-4"
            />
            <h3 className="text-accent text-sm">
              Chat with your file {file.file_name}{" "}
            </h3>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-scroll p-3 space-y-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-thumb-rounded hover:scrollbar-thumb-black">
          {/* /////////////////////////////////////////////////////////////////////////// */}

          {chat_data.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center ${
                msg.type === "human" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.type === "ai" && (
                <Image
                  src="/chatbot.png"
                  width={50}
                  height={50}
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`p-2 max-w-xs rounded-md ${
                  msg.type === "human"
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.data.content}
              </div>
              {msg.type === "human" && <FaUser width={50} height={50} />}
            </div>
          ))}

          {/* ///////////////////////////////////////////////////////////////////// */}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center  ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <Image
                  src="/chatbot.png"
                  width={50}
                  height={50}
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`p-2 max-w-xs rounded-md ${
                  msg.sender === "user"
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && <FaUser width={40} height={40} />}
            </div>
          ))}

          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-start items-center space-x-2">
              <Image
                src="/chatbot.png"
                width={50}
                height={50}
                alt="Bot Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex space-x-1">
                <div className="w-5 h-5 bg-white rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-white rounded-full animate-pulse delay-75"></div>
                <div className="w-5 h-5 bg-white rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnterKey}
            className="flex-1 px-3 py-2 rounded-full text-black focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="ml-1 w-10 h-10 bg-accent rounded-full flex items-center justify-center"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default PdfUi2;
