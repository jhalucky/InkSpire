import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET blog by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const blogId = params.id;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        author: true,
        likes: true,
        comments: { include: { author: true }, orderBy: { createdAt: "desc" } },
      },
    });
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// POST is now empty, as it will be handled by the dedicated /like endpoint
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
