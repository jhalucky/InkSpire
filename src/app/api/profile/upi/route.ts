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

    const { upiId } = await req.json();

    if (!upiId || typeof upiId !== "string") {
      return NextResponse.json({ error: "Invalid UPI ID" }, { status: 400 });
    }

    // Update user's UPI ID in database
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { upiId },
    });

    return NextResponse.json({ message: "UPI ID saved successfully", upiId: user.upiId });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
