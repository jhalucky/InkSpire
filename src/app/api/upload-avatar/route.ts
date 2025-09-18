import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises"; // Import mkdir
import path from "path";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique file name and define upload directory
    const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`; // Sanitize filename
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, uniqueFileName);

    // *** CRITICAL ADDITION: Ensure the upload directory exists ***
    await mkdir(uploadDir, { recursive: true }); 
    // `recursive: true` ensures parent directories are also created if they don't exist.

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${uniqueFileName}`;

    // Update user in DB
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { avatar: imageUrl },
    });

    // Return the URL of the newly uploaded image
    return NextResponse.json({ success: true, user: updatedUser, imageUrl });

  } catch (err) {
    console.error("Avatar upload server error:", err); // More specific logging
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}