

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
// import { Chat } from "../pdf/pdfAction";
// import { Agent } from "./agent";
 
import GetDefaultLanguage from "@/lib/getDefaultLanguage";


function page() {
   
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [response1, setResponse1] = useState('');
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  const [show, setShow] = useState(true);

 
 
  const sendMessage = async (msg) => {
    if (msg.trim()) {
      const newMessages = [...messages, { sender: 'user', text: msg }];
      setMessages(newMessages);
      setInput('');
      setLoading(true);

      try {
        const response = await fetch('/api/agentic-rag', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text1: msg }),
        });

        const data = await response.json();
        const responseText = { sender: 'bot', text: '' };
        
        let index = 0;
        const streamInterval = setInterval(() => {
          if (index < data.answer.length) {
            responseText.text += data.answer[index];
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
        console.error('Error fetching response:', error);
      } finally {
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
     
        if (event.key === "Enter") {
          sendMessage(input);
        }
          
       
   
      };
    
      const handleSubmitButton = () => {
   
          sendMessage(input);
    
   
      };
    

  const [current_language, setCurrent_Language] = useState("");
  
  useEffect(() => {
    const lang = GetDefaultLanguage();
    setCurrent_Language(lang);
  }, []);

  return (
    
          <div
            className={`h-screen bg-[#27272c] text-white w-[70%]   shadow-lg flex flex-col transition-all duration-500 `}
          >
            <header className="flex  justify-between p-3 border-b border-black">
              <div className="flex flex-row items-center justify-center  gap-2">
                <Image
                  src="/chatbot.png"
                  width={50}
                  height={50}
                  alt="momad image"
                  className="rounded-xl mr-3 mt-4"
                />
                <h3 className="text-accent text-2xl">
                  Faiz Agent
                </h3>

                <Link href="/dashboard">
                <button className="bg-sky-500 p-4 rounded-xl">
                  /Dashboard
                </button>
                </Link>
              </div>
            </header>
    
            {/* Messages Area */}
            <div className="flex-1 overflow-y-scroll p-3 space-y-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-thumb-rounded hover:scrollbar-thumb-black">
     {/* /////////////////////////////////////////////////////////////////////////// */}
    
 
    
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
    
                    dir={`${current_language==="ar" ? "rtl":"ltr"}`}
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
                onClick={handleSubmitButton}
                className="ml-1 w-10 h-10 bg-accent rounded-full flex items-center justify-center"
              >
                ➤ 
              </button>
            </div>
          </div>
  )

}
export default page 
