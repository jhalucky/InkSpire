import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string }; // this is blog ID
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: true,
        likes: true,
        comments: { include: { author: true } },
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...blog,
      coverimage:
        blog.coverimage && blog.coverimage.trim() !== ""
          ? blog.coverimage
          : "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
