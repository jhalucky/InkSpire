// src/app/api/profile/setup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  const usernameRegex = /^[a-z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return NextResponse.json({ error: "Invalid username format. Must be 3-20 characters, lowercase, and can include underscores." }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { username },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile setup error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}