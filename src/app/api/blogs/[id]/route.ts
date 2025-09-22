import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET single blog by id
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: true,
        likes: true,
        comments: { include: { author: true } },
      },
    });

    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json(blog);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT update blog by id
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { title, content } = await req.json();

    const updated = await prisma.blog.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE blog by id
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    await prisma.blog.delete({ where: { id } });

    return NextResponse.json({ message: "Blog deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
