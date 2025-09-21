// src/app/api/blogs/[id]/comment/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { params } = context;
    const { id: blogId } = await params; // <-- await the params Promise

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
};
