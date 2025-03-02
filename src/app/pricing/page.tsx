
import SubscriptionButton from "@/components/SubscriptionButton"
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@/auth"; 
import { User } from "@/model/user-model"; 

export default async function PaymentPage() {
  const session = await auth();
  if (!session) {
      return false;
  }
  const useremail: string | undefined = session?.user?.email ?? undefined;

  const user = await User.findOne({ email:useremail }).select("-password"); // Exclude password for security
   if (!user) {
       return false;
   }

   const isPro = await checkSubscription();

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      
      <SubscriptionButton isPro={isPro} />
    </div>
  );
}
 