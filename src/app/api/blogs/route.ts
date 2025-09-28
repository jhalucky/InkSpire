import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true,
        likes: true,
        comments: { include: { author: true }  },
      },
      orderBy: { createdAt: "desc" },
    });

    const blogsWithFallback = blogs.map((b) => ({
      ...b,
      coverimage:
        b.coverimage && b.coverimage.trim() !== ""
          ? b.coverimage
          : "https://cdn-icons-png.flaticon.com/512/1144/1144760.png", // ✅ fallback
    }));

    return NextResponse.json(blogsWithFallback);
  } catch (err: any) {
    console.error("Fetch blogs error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
