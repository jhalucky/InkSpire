import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: blogId } = await context.params;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check if user already liked the blog
    const existingLike = await prisma.blogLike.findFirst({
      where: { userId: user.id, blogId },
      
    });

    let liked: boolean;

    if (existingLike) {
      // Remove like
      await prisma.blogLike.delete({ where: { id: existingLike.id } });
      liked = false;
    } else {
      // Add like
      await prisma.blogLike.create({
        data: { userId: user.id, blogId },
      });
      liked = true;
    }

    // Get current likes count
    const likesCount = await prisma.blogLike.count({ where: { blogId } });

    return NextResponse.json({ liked, likesCount });
  } catch (err) {
    console.error("Error toggling like:", err);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
