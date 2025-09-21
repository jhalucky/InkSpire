// src/app/api/blogs/[id]/comment/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const blogId = params.id;

  try {
    const { content, authorId } = await req.json();

    if (!authorId) {
      return NextResponse.json({ error: "AuthorId is required" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        blogId,
        authorId,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(comment);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
