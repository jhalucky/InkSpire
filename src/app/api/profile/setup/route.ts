import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;
    const profession = formData.get("profession") as string;
    const education = formData.get("education") as string;
    const avatarFile = formData.get("avatar") as File;

    let avatarUrl: string | undefined = undefined;

    if (avatarFile && avatarFile.size > 0) {
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${avatarFile.name}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
      avatarUrl = `/uploads/${fileName}`;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name, username, bio, profession, education, avatar: avatarUrl },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Profile setup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
