import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const { id: blogId } = context.params;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { content } = await req.json();
    if (!content) return NextResponse.json({ error: "Content is required" }, { status: 400 });

    const comment = await prisma.comment.create({
      data: {
        content,
        blogId,
        authorId: user.id,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(comment);
  } catch (err) {
    console.error("Error posting comment:", err);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
