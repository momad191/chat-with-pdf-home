import { stripe } from "@/lib/stripe";
import { dbConnect } from "@/lib/mongo";
import { auth } from "@/auth"; 
import { User } from "@/model/user-model"; 
import { NextResponse } from "next/server";
import { Subscription } from "@/model/subscription"; 
 
const return_url = process.env.NEXT_BASE_URL + "/dashboard/upgrade";

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const useremail: string | undefined = session?.user?.email ?? undefined;
    if (!useremail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const user = await User.findOne({ email: useremail }).select("-password"); // Exclude password for security
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const userId = user._id.toString(); // Ensure it's a string
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const email = user.email;
    const name = user.name;
    

    const _userSubscriptions = await Subscription.findOne({ userId:userId });

if (_userSubscriptions && _userSubscriptions.stripeCustomerId) {
  // trying to cancel at the billing portal
  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: _userSubscriptions.stripeCustomerId,
    return_url,
  });
    console.log("cancel X")
  return NextResponse.json({ url: stripeSession.url });
}



    // user's first time trying to subscribe
    // Create Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: return_url,
      cancel_url: return_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: useremail, // Ensure it's a valid string
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Chat with your PDF Files",
              description: "Unlimited PDF sessions!",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        email,
        name
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
