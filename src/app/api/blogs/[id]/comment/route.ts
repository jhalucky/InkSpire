import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <--- Important change
) {
  const { id } = await context.params; // <--- await the Promise

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { content } = await req.json();
  if (!content) return NextResponse.json({ error: "Content is required" }, { status: 400 });

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        blogId: id,
        authorId: user.id,
      },
      include: { author: true },
    });

    return NextResponse.json(comment);
  } catch (err) {
    console.error("Error posting comment:", err);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
