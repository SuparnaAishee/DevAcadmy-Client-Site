import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

let users: { email: string; password: string }[] = []; // Replace with DB

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
