import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { toUserId, amount, message } = body;

    if (!toUserId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    const tip = await prisma.tip.create({
      data: {
        toUserId,
        fromUserId: session.user.id,
        amount,
        message: message || "",
      },
    });

    return NextResponse.json({ success: true, tip });
  } catch (err: any) {
    console.error("Tip API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}