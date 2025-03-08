
import { auth } from "@/auth";
import SidebarWrapper from "@/components/SidebarWrapper";
import AllEmails from "./AllEmails";


const page = async () => {
const session = await auth();   
   if (!session?.user) redirect("/");
  return (
    <div className=" md:flex ">
    <SidebarWrapper session={session} />
     <AllEmails />
    </div>
    
  )
}
  
export default page