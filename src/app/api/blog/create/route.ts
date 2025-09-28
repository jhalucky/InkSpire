import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, coverimage } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // fallback if user email missing
    const email = session.user.email;
    if (!email) {
      return NextResponse.json({ error: "User email is missing" }, { status: 400 });
    }

    const post = await prisma.blog.create({
      data: {
        title,
        content,
        coverimage: coverimage || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png", // default
        author: { connect: { email } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    console.error("Error creating blog:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
