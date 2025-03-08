import Upgrade from "./UpgradeUi"
import { auth } from "@/auth";
import { checkSubscription } from "@/lib/subscription";
import SidebarWrapper from "../../../components/SidebarWrapper";
 
const page = async() => {
  const session = await auth();
  const isPro = await checkSubscription();
  return ( 

    <div className="md:flex ">
      <SidebarWrapper session={session} />
      <Upgrade session={session} isPro={isPro}/>
    </div>
  )
}

export default page