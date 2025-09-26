import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Params) {
  const { id } = await params;

  if (!id) return NextResponse.json({ error: "Missing user id" }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        upiId: true,
        upiName: true,
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error fetching author UPI:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
