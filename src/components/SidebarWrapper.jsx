"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { IoClose } from "react-icons/io5";
import { MdOpenInFull } from "react-icons/md"; 
import { useTranslations } from "next-intl";

const SidebarWrapper = ({session}) => {
    const t = useTranslations("SidebarWrapper");
    
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);
 
    return (
        <>
            <button
                onClick={toggleSidebar}
                className={`absolute font-bold  top-2 right-4 p-2 items-center justify-center bg-gray-800 text-white  fixed  z-50 rounded-xl hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 transition-all`}
            >
            {isOpen ?  <div className="flex items-center justify-center gap-2">  {t("Close Side menu")} <IoClose /> </div> :  <div className="flex items-center justify-center gap-2">  {t("Open Side menu")} <MdOpenInFull /> </div> }
            </button>
            <Sidebar isOpen={isOpen}   session={session}  />  
        </>
    );
};
 
export default SidebarWrapper;
