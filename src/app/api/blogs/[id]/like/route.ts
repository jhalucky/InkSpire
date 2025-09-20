import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blogId = params.id;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const existingLike = await prisma.blogLike.findFirst({
    where: { userId: user.id, blogId },
  });

  let liked: boolean;
  if (existingLike) {
    await prisma.blogLike.delete({ where: { id: existingLike.id } });
    liked = false;
  } else {
    await prisma.blogLike.create({ data: { userId: user.id, blogId } });
    liked = true;
  }

  const likesCount = await prisma.blogLike.count({ where: { blogId } });

  return NextResponse.json({ liked, likesCount });
}

