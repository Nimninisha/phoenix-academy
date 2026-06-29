import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Subscription from "@/lib/models/subscription";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const metadata = session.metadata;
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    await connectDB();

    const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);

    const currentPeriodStart = new Date(
      stripeSub.current_period_start * 1000
    );
    const currentPeriodEnd = new Date(
      stripeSub.current_period_end * 1000
    );

    await Subscription.create({
      userId: metadata.userId,
      planId: metadata.planId,
      planKind: metadata.planKind,
      resourceType: metadata.resourceType,
      billingPeriod: metadata.billingPeriod,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      status: "active",
      currentPeriodStart,
      currentPeriodEnd,
    });
  }

  return new Response("OK", { status: 200 });
}
