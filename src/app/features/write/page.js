import SidebarWrapper from "@/components/SidebarWrapper";

import SidebarWrapperEmail from "./SidebarWrapperEmail";
import { auth } from "@/auth";

const Write = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div className=" lg:flex  bg-gray-800 ">
      <SidebarWrapper session={session} />

      <SidebarWrapperEmail session={session} />
    </div>
  );
};

export default Write;
