import dbConnect from "../../../../lib/mongodb";
import Simulation from "../../../../models/simulation";

export async function GET() {
  await dbConnect();
  const sims = await Simulation.find({});
  return Response.json(sims);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const sim = await Simulation.create({
    title: body.title,
    category: body.category,
    index: body.index,
    free: body.free || false,
  });

  return Response.json(sim);
}