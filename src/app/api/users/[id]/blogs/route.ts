import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
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
    return NextResponse.json(
      { error: "Failed to fetch user blogs" },
      { status: 500 }
    );
  }
}
