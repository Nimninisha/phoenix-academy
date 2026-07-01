import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // ✅ Validate
    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    // ✅ Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save correctly
    await User.create({
      name,
      email,
      passwordHash: hashedPassword,
    });

    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (err) {
    console.error("REGISTER ERROR:", err); // ✅ IMPORTANT

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}