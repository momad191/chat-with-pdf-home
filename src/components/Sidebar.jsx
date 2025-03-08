import { FaFolder, FaUser, FaCog } from "react-icons/fa";
import { GiLevelFour } from "react-icons/gi";
import { RiFileAddFill } from "react-icons/ri";
import { MdOutlineHome } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";

import Link from "next/link";
import Image from "next/image"; 
import Logout from "@/components/Logout";
import { useTranslations } from "next-intl";

const Sidebar = ({ isOpen, session }) => {
  const t = useTranslations("Sidebar");
  return (
    <>
      {/* Sidebar */}
      <div
        className={`w-full lg:w-[450px] h-screen bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "relative" : "hidden"
        }  `}
      >
        <div className="p-4 border-b border-gray-700  items-center justify-between">
          {/* <h2 className="text-xl font-semibold">Chat with PDFs</h2> */}

          {session?.user?.name && session?.user?.image ? (
            <>
              <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full mt-10"
              />
              <h1 className="text-md  my-2">
                {t("Hi")} , {session?.user?.name}
              </h1>
            </>
          ) : (
            <>
              <Image
                src="/default-avatar.jpg"
                alt="avatar"
                width={72}
                height={72}
                className="rounded-full"
              />
              <h1 className="text-sm my-2">
                {t("Welcome")} , {session?.user?.email}
              </h1>
            </>
          )}

          <Link
            href="/"
            className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
          >
            / <MdOutlineHome className="mr-3" size={18} />
          </Link>
        </div>
 
        <nav className="p-4 space-y-2 ">
          <Link
            href="/dashboard"
            className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
          >
            <RiFileAddFill className="mr-3" size={18} />
            {t("Add new File")}
          </Link>
          <Link
            href="/features/write"
            className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
          >
            <MdMarkEmailRead className="mr-3" size={18} />
            Write Email
          </Link>

 
          <Link
            href="/features/write/all"
            className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
          >
            <MdMarkEmailRead className="mr-3" size={18} />
            My Emails
          </Link>

          <Link
            href="/dashboard/files"
            className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
          >
            <FaFolder className="mr-3" size={18} />
            {t("Files")}
          </Link>

          <Link
            href="/dashboard/upgrade"
            className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
          >
            <GiLevelFour className="mr-3" size={18} /> {t("Upgrade")}
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
          >
            <FaUser className="mr-3" size={18} /> {t("Account")}
          </Link>

          {/* <Link
                        href="/dashboard/general-settings"
                        className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
                    >
                        <FaCog className="mr-3" size={18} /> App Settings
                    </Link> */}
          <Logout />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
