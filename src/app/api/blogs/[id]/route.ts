import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Next.js 15 App Router expects params as a Promise
type ParamsContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: ParamsContext) {
  const { id } = await context.params; // <--- await the promise
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { author: true, likes: true, comments: { include: { author: true } } },
  });

  if (!blog)
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest, context: ParamsContext) {
  const { id } = await context.params;
  const data = await req.json();

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedBlog);
}

export async function DELETE(req: NextRequest, context: ParamsContext) {
  const { id } = await context.params;

  await prisma.blog.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted successfully" });
}
