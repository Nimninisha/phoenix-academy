export const dynamic = "force-dynamic";

import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/lib/models/subscription";

export async function GET(req) {
  try {
    const token =
      req.cookies.get("auth_token")
        ?.value;

    if (!token) {
      return Response.json(
        {
          subscriptions: [],
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    await dbConnect();

    const subscriptions =
      await Subscription.find({
        userId: decoded.userId,
      }).sort({
        createdAt: -1,
      });

    return Response.json({
      subscriptions,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        subscriptions: [],
      },
      {
        status: 500,
      }
    );
  }
}