import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      bio: body.bio,
      profession: body.profession,
      education: body.education,
      twitterUrl: body.twitterUrl,
      avatar: body.avatar, // if uploading custom avatar
    },
  });

  return NextResponse.json({success: true, user: updatedUser });
}
