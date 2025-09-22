// src/app/api/blogs/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET blog by ID
export const GET = async (_req: Request, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: true,
        likes: true,
        comments: { include: { author: true } },
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
};

// PUT to update blog
export const PUT = async (req: Request, context: { params: { id: string } }) => {
  const { id } = context.params;
  const { title, content } = await req.json();

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedBlog);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
};

// DELETE blog
export const DELETE = async (_req: Request, context: { params: { id: string } }) => {
  const { id } = context.params;

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
};
