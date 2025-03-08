import ProfileUi from "./ProfileUi"  
import { auth } from "@/auth";
import SidebarWrapper from "../../../components/SidebarWrapper";
const page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (

    <div className="md:flex ">
    <SidebarWrapper session={session} />
    <ProfileUi session={session} />
    </div>
  )
}

export default page 