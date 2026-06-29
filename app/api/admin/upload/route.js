export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Simulation from "@/lib/models/simulation";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const sim = await Simulation.create(body);

  return Response.json(sim);
}