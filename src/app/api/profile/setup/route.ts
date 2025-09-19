import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // Get the user's session
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { username, bio, profession, education, twitterUrl } = body;

    // Validate the required fields
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }
    
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.id !== session.user.id) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }

    // Update the user in the database and return the updated user object
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username,
        bio,
        profession,
        education,
        twitterUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
        bio: true,
        profession: true,
        education: true,
        twitterUrl: true,
      },
    });

    // Return the updated user data
    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
