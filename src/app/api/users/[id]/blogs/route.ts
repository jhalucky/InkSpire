// src/app/api/users/[id]/blogs/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const blogs = await prisma.blog.findMany({
      where: { authorId: id },
      include: {
        author: true,
        likes: true,
        comments: { include: { author: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch user's blogs" }, { status: 500 });
  }
}
