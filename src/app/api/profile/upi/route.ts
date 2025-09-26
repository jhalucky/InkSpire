import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { upiId } = body;

    if (!upiId || typeof upiId !== "string") {
      return NextResponse.json({ error: "Invalid UPI ID" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { upiId },
    });

    return NextResponse.json({
      message: "UPI ID saved successfully",
      upiId: user.upiId,
    });
  } catch (err: any) {
    console.error("UPI API Error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
