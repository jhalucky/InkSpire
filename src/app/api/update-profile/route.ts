// src/app/api/update-profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { username, bio, twitterUrl, profession, education } = body;

    // ✅ Check for duplicate username (ignore current user)
    if (username) {
      const existing = await prisma.user.findUnique({
        where: { username },
      });

      if (existing && existing.email !== session.user.email) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 }
        );
      }
    }

    // ✅ Update profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        username,
        bio,
        twitterUrl,
        profession,
        education,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
