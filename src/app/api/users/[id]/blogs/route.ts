import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params is a Promise
) {
  const { id } = await context.params; // await params to get id

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        blogs: {
          include: { author: true, likes: true, comments: { include: { author: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
