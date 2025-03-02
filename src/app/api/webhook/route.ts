// import { db } from "@/lib/db";
// import { eq } from "drizzle-orm";
// import { userSubscriptions } from "@/lib/db/schema";
import { Subscription } from "@/model/subscription"; 
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
 
export async function POST(req: Request) {
  const body = await req.text();
 
   // ✅ Await headers() before using .get()
   const headersList = await headers();
   const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;
 
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string
    );
  } catch (error) {
    return new NextResponse("webhook error", { status: 400 });
  }
   
  const session = event.data.object as Stripe.Checkout.Session;
  

  // new subscription created
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    if (!session?.metadata?.userId) {
      return new NextResponse("no userid", { status: 400 });
    } 

    await Subscription.create({ 
      userId: session.metadata.userId,
      name: session.metadata.name,
      email: session.metadata.email,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
  
    });

    console.log("inserted to database ok ok ok ok ")

  }
  

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id }, // Find document by stripeSubscriptionId
      {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
      { new: true } // Return the updated document
    );

      console.log("updated  to database ok ok ok ok ")
  }

  return new NextResponse(null, { status: 200 });
}