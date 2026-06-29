import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Plan from "@/lib/models/plan";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  const { planKind, billingPeriod, userId } = await req.json();

  const plan = await Plan.findOne({
    planKind,
    billingPeriod,
  });

  if (!plan) {
    return Response.json({ error: "Plan not found" }, { status: 404 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: plan.stripePriceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/my-subscriptions?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/store?canceled=true`,
    metadata: {
      userId,
      planId: plan._id.toString(),
      planKind: plan.planKind,
      resourceType: plan.resourceType,
      billingPeriod: plan.billingPeriod,
    },
  });

  return Response.json({ id: session.id });
}
