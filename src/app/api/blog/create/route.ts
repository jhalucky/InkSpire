import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await req.json();

    const post = await prisma.blog.create({
      data: {
        title,
        content,
        author: { connect: { email: session.user.email } },
      },
    });

    return NextResponse.json(post);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
