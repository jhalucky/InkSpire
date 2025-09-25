import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET blog by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
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

// POST toggle like
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id: blogId } = params;
  const body = await req.json();

  // Toggle like
  if (body.likeAction && body.userId) {
    try {
      const existingLike = await prisma.blogLike.findFirst({
        where: { blogId, userId: body.userId },
      });
      if (existingLike) {
        await prisma.blogLike.delete({ where: { id: existingLike.id } });
      } else {
        await prisma.blogLike.create({ data: { blogId, userId: body.userId } });
      }
      const likesCount = await prisma.blogLike.count({ where: { blogId } });
      const liked = !!(await prisma.blogLike.findFirst({ where: { blogId, userId: body.userId } }));
      return NextResponse.json({ likesCount, liked });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
