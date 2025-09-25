import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET user by id
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        profession: true,
        education: true,
        twitterUrl: true,
        githubUrl: true,
        instagramUrl: true,
        linkedinUrl: true,
        upiId: true,
        upiName: true,
        blogs: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting user:", err);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}

// PUT or PATCH user data
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const body = await req.json();
    const {
      name,
      username,
      bio,
      profession,
      education,
      twitterUrl,
      githubUrl,
      instagramUrl,
      linkedinUrl,
      upiId,
      upiName,
    } = body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        username,
        bio,
        profession,
        education,
        twitterUrl,
        githubUrl,
        instagramUrl,
        linkedinUrl,
        upiId,
        upiName,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}