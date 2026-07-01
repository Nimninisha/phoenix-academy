import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    console.log("STEP 1: Route entered");

    await dbConnect();
    console.log("STEP 2: Database connected");

    const body = await req.json();
    console.log("STEP 3: Request received", body);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });

    console.log("STEP 4: Existing user check", existing);

    if (existing) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("STEP 5: Password hashed");

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      role: "student",
    });

    console.log("STEP 6: User created", user);

    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("REGISTER ERROR FULL:", err);

    return Response.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}