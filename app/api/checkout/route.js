export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "auto";

import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Plan from "@/lib/models/plan";

export async function POST(req) {
  try {
    await dbConnect();

    const Stripe = (await import("stripe")).default;

    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY
    );

    const token =
      req.cookies.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        {
          error: "Please login first",
        },
        {
          status: 401,
        }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (err) {
      return Response.json(
        {
          error: "Invalid session",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    console.log("REQUEST BODY:", body);

    const {
      planKind,
      billingPeriod,
    } = body;

    console.log("PLAN KIND:", planKind);
    console.log("BILLING PERIOD:", billingPeriod);

    const plan = await Plan.findOne({
      planKind,
      billingPeriod,
    });

    console.log("PLAN FOUND:", plan);

    if (!plan) {
      return Response.json(
        {
          error: `Plan not found for ${planKind} / ${billingPeriod}`,
        },
        {
          status: 404,
        }
      );
    }

    console.log(
      "PRICE ID:",
      plan.stripePriceId
    );

    if (!plan.stripePriceId) {
      return Response.json(
        {
          error:
            "Stripe price ID missing for this plan",
        },
        {
          status: 400,
        }
      );
    }

    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        line_items: [
          {
            price: plan.stripePriceId,
            quantity: 1,
          },
        ],

        success_url:
          `${process.env.NEXT_PUBLIC_BASE_URL}/my-subscriptions?success=true`,

        cancel_url:
          `${process.env.NEXT_PUBLIC_BASE_URL}/store?canceled=true`,

        metadata: {
          userId: decoded.userId,
          planId: plan._id.toString(),
          planKind: plan.planKind,
          resourceType:
            plan.resourceType,
          billingPeriod:
            plan.billingPeriod,
        },
      });

    console.log(
      "SESSION CREATED:",
      session.id
    );

    return Response.json({
      id: session.id,
    });
  } catch (error) {
    console.error(
      "CHECKOUT ERROR:",
      error
    );

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}