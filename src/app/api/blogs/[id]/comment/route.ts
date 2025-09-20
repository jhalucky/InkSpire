import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await req.json();
    if (!content || content.trim() === "") {
      return NextResponse.json({ error: "Empty comment" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check if the blog exists
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    });
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    const comment = await prisma.comment.create({
      data: { content, authorId: user.id, blogId: blog.id },
      include: { author: true },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}