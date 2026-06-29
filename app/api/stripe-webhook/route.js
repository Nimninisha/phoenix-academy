import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Subscription from "@/lib/models/subscription";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Stripe requires raw body
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  // Handle checkout completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const metadata = session.metadata;
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    await connectDB();

    // Retrieve full subscription details from Stripe
    const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);

    const currentPeriodStart = new Date(
      stripeSub.current_period_start * 1000
    );
    const currentPeriodEnd = new Date(
      stripeSub.current_period_end * 1000
    );

    // Save subscription in MongoDB
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

    // ⭐ Notify Phoenix (Admin)
    await resend.emails.send({
      from: "Phoenix Academy <notifications@phoenixacademy.com>",
      to: "nimninisha@gmail.com",
      subject: "New Subscription Started",
      html: `
        <h2>New Subscription Started</h2>
        <p><strong>User ID:</strong> ${metadata.userId}</p>
        <p><strong>Plan ID:</strong> ${metadata.planId}</p>
        <p><strong>Plan Kind:</strong> ${metadata.planKind}</p>
        <p><strong>Resource Type:</strong> ${metadata.resourceType}</p>
        <p><strong>Billing Period:</strong> ${metadata.billingPeriod}</p>
        <p><strong>Stripe Subscription ID:</strong> ${subscriptionId}</p>
        <p><strong>Period:</strong> ${currentPeriodStart.toDateString()} → ${currentPeriodEnd.toDateString()}</p>
        <br/>
        <p>A new student has subscribed.</p>
      `,
    });
  }

  return new Response("OK", { status: 200 });
}
