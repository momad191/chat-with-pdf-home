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
                className={`top-2 left-0 font-bold p-2 items-center justify-center bg-gray-800 text-white  fixed  z-50  hover:bg-gray-600 focus:ring-0 focus:ring-gray-300 transition-all`}
            >
            {isOpen ?  <div className="flex items-center justify-center gap-2"> <IoClose /> {t("Close Side menu")}  </div> :  <div className="flex items-center justify-center gap-2"> <MdOpenInFull /> {t("Open Side menu")}  </div> }
            </button>

            
            
          
            <Sidebar isOpen={isOpen}   session={session}  />  
        </>
    );
};
 
export default SidebarWrapper;
