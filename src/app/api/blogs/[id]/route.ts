// src/app/api/blogs/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

// GET a single blog by id
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        likes: true,
        comments: { include: { author: true } },
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, context: { params: { id: string } }) {

const { id } = context.params;
  try {
    const data = await req.json();

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("PUT blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
const { id } = context.params;
  try {
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
