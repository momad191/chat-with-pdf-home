"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { IoClose } from "react-icons/io5";
import { MdOpenInFull } from "react-icons/md";
const SidebarWrapper = ({session}) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);
 
    return (
        <>
            <button
                onClick={toggleSidebar}
                className="md:hidden p-2 bg-blue-500 text-white fixed top-4 right-4 z-50 rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all"
            >
            {isOpen ? <IoClose /> : <MdOpenInFull /> }
            </button>
            <Sidebar isOpen={isOpen} session={session}  /> 
        </>
    );
};
 
export default SidebarWrapper;
