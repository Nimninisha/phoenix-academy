import { connectDB } from "@/lib/db";
import Simulation from "@/lib/models/simulation";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const sim = await Simulation.create(body);

  return Response.json(sim);
}
