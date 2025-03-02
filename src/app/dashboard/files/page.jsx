import FilesUi from "./FilesUi"
import { auth } from "@/auth";

const page = async () => {
const session = await auth();   
   if (!session?.user) redirect("/");
  return (
    <FilesUi session={session} />
  )
}
  
export default page