import ProfileUi from "./ProfileUi"  
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <ProfileUi session={session} />
  )
}

export default page