 

import OneEmailUi from "./OneEmailUi"
import { auth } from "@/auth";
import SidebarWrapper from "@/components/SidebarWrapper";

export default async function Page({ params }) {
  const id = (await params).id
  const session = await auth();   
   if (!session?.user) redirect("/");
   
  return (
    <div className=" md:flex ">
  
    <SidebarWrapper session={session} />
   <OneEmailUi email_id={id} />
   </div>
  )
}
 
 