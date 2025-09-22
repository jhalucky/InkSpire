import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { author: true, likes: true, comments: { include: { author: true } } },
  });

  if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } } // make sure it's NOT a Promise here
) {
  const id = context.params.id;
  const data = await req.json();

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedBlog);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  await prisma.blog.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted successfully" });
}
