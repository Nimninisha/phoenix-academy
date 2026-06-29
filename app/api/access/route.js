import something from "../../../lib/subscriptionAccess";
export async function POST(req) {
  const { userId, planKind } = await req.json();

  const hasAccess = await hasActiveSubscription({ userId, planKind });

  return Response.json({ hasAccess });
}
