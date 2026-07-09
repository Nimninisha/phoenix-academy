export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import dbConnect from "@/lib/mongodb";
import Subscription from "@/lib/models/subscription";

export async function POST(req) {
  try {
    console.log("WEBHOOK HIT");

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY
    );

    const { Resend } = await import("resend");
    const resend = new Resend(
      process.env.RESEND_API_KEY
    );

    const sig = req.headers.get(
      "stripe-signature"
    );

    const webhookSecret =
      process.env.STRIPE_WEBHOOK_SECRET;

    const buf = await req.arrayBuffer();
    const body = Buffer.from(buf);

    let event;

    try {
      event =
        stripe.webhooks.constructEvent(
          body,
          sig,
          webhookSecret
        );
    } catch (err) {
      console.error(
        "Webhook signature verification failed:",
        err.message
      );

      return new Response(
        "Webhook Error",
        {
          status: 400,
        }
      );
    }

    console.log(
      "EVENT TYPE:",
      event.type
    );

    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const session =
        event.data.object;

      console.log(
        "SESSION:",
        session.id
      );

      const metadata =
        session.metadata || {};

      const customerId =
        session.customer;

      const subscriptionId =
        session.subscription;

      await dbConnect();

      let currentPeriodStart =
        new Date();

      let currentPeriodEnd =
        new Date(
          Date.now() +
            30 *
              24 *
              60 *
              60 *
              1000
        );

      try {
        const stripeSub =
          await stripe.subscriptions.retrieve(
            subscriptionId
          );

        console.log(
          "STRIPE SUB:",
          stripeSub.id
        );

        if (
          stripeSub.items?.data?.[0]
            ?.current_period_start
        ) {
          currentPeriodStart =
            new Date(
              stripeSub.items.data[0]
                .current_period_start * 1000
            );
        }

        if (
          stripeSub.items?.data?.[0]
            ?.current_period_end
        ) {
          currentPeriodEnd =
            new Date(
              stripeSub.items.data[0]
                .current_period_end * 1000
            );
        }
      } catch (err) {
        console.error(
          "Subscription retrieval failed:",
          err
        );
      }

      const existing =
        await Subscription.findOne({
          stripeSubscriptionId:
            subscriptionId,
        });

      if (!existing) {
        await Subscription.create({
          userId:
            metadata.userId,
          planId:
            metadata.planId,
          planKind:
            metadata.planKind,
          resourceType:
            metadata.resourceType,
          billingPeriod:
            metadata.billingPeriod,
          stripeCustomerId:
            customerId,
          stripeSubscriptionId:
            subscriptionId,
          status: "active",
          currentPeriodStart,
          currentPeriodEnd,
        });

        console.log(
          "SUBSCRIPTION CREATED"
        );
      }

      try {
        await resend.emails.send({
          from:
            "Phoenix Academy <notifications@phoenixacademy.com>",
          to: "nimninisha@gmail.com",
          subject:
            "New Subscription Started",
          html: `
            <h2>New Subscription Started</h2>
            <p>User ID: ${metadata.userId}</p>
            <p>Plan: ${metadata.planKind}</p>
            <p>Billing: ${metadata.billingPeriod}</p>
            <p>Stripe Subscription: ${subscriptionId}</p>
          `,
        });
      } catch (emailError) {
        console.error(
          "EMAIL ERROR:",
          emailError
        );
      }
    }

    return new Response("OK", {
      status: 200,
    });
  } catch (error) {
    console.error(
      "WEBHOOK FATAL ERROR:",
      error
    );

    return new Response(
      "Webhook Failed",
      {
        status: 500,
      }
    );
  }
}
