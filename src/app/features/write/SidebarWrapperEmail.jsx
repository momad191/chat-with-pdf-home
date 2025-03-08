"use client";
import { useState } from "react";
import SidebarEmail from "./SidebarEmail";
import { IoClose } from "react-icons/io5";
import { MdOpenInFull } from "react-icons/md"; 
import { useTranslations } from "next-intl";

const SidebarWrapperEmail = ({session}) => {
    const t = useTranslations("SidebarWrapper");
    
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);
 
    return (
        <>
            
            <SidebarEmail isOpen={isOpen}   session={session}  />  
        </>
    );
};
 
export default SidebarWrapperEmail;
