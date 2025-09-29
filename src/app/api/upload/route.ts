import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const bytes = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, bytes);

    // Return relative path for DB & frontend
    const relativePath = `/uploads/${file.name}`;

    return NextResponse.json({ filePath: relativePath });
  } catch (err: any) {
    console.error("File upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}
