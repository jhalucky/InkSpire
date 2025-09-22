import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET all blogs by a specific user
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

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

