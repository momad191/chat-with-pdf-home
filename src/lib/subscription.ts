import { auth } from "@/auth"; 
import { User } from "@/model/user-model"; 
import { Subscription } from "@/model/subscription"; 

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
    const session = await auth();
    if (!session) {
        return false;
    }
    const useremail: string | undefined = session?.user?.email ?? undefined;

       const user = await User.findOne({ email:useremail }).select("-password"); // Exclude password for security
        if (!user) {
            return false;
        }
 
  
    const userSubscription = await Subscription.findOne({ userId: user._id });
  
    if (!userSubscription) {
      return false;
    }
  
    const isValid =
      userSubscription.stripePriceId &&
      new Date(userSubscription.stripeCurrentPeriodEnd).getTime() + DAY_IN_MS > Date.now();
  
    return !!isValid;
  };
  