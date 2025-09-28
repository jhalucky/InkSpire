// src/app/api/user/[id]/blogs/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params is a Promise now
) {
  const { id } = await context.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        blogs: {
          include: {
            author: true,
            likes: true,
            comments: { include: { author: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const blogsWithFallback = user.blogs.map((b) => ({
      ...b,
      coverimage: (b.coverimage ?? "").trim() !== "" ? b.coverimage : fallbackImage,
    }));

    return NextResponse.json(blogsWithFallback);
  } catch (err) {
    console.error("Failed to fetch user blogs:", err);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
