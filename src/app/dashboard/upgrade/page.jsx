import Upgrade from "./UpgradeUi"
import { auth } from "@/auth";
import { checkSubscription } from "@/lib/subscription";
 
const page = async() => {
  const session = await auth();
  const isPro = await checkSubscription();
  return ( 
    <div>
      <Upgrade session={session} isPro={isPro}/>
    </div>
  )
}

export default page