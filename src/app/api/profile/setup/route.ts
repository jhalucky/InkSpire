// src/app/api/profile/setup/route.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { username } = body;

  const updated = await prisma.user.update({
    where: { email: session.user.email },
    data: { username },
  });

  return NextResponse.json(updated);
}
