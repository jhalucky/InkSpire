// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { title, content, coverimage } = await req.json();

//     if (!title || !content) {
//       return NextResponse.json(
//         { error: "Title and content are required" },
//         { status: 400 }
//       );
//     }

  
//     let coverimageData = coverimage;
//     if (coverimage && coverimage.startsWith("data:")) {
//       coverimageData = coverimage;
//     }

//     const blog = await prisma.blog.create({
//       data: {
//         title,
//         content,
//         coverimage: coverimageData || "/inkspire.png", 
//         author: { connect: { email: session.user.email! } },
//       },
//     });

//     return NextResponse.json(blog, { status: 201 });
//   } catch (error: any) {
//     console.error("Error creating blog:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// const FALLBACK_IMAGE = "/inkspire.png";

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { title, content, coverimage } = await req.json();

//     if (!title || !content) {
//       return NextResponse.json(
//         { error: "Title and content are required" },
//         { status: 400 }
//       );
//     }

//     // Decide cover image
//     let coverimageData: string;
//     if (coverimage && typeof coverimage === "string" && coverimage.trim() !== "") {
//       coverimageData = coverimage;
//     } else {
//       coverimageData = FALLBACK_IMAGE;
//     }

//     const blog = await prisma.blog.create({
//       data: {
//         title,
//         content,
//         coverimage: coverimageData,
//         author: { connect: { email: session.user.email! } },
//       },
//     });

//     return NextResponse.json(blog, { status: 201 });
//   } catch (error: any) {
//     console.error("Error creating blog:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, coverimage } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // ✅ only save coverimage if provided
    const coverimageData =
      coverimage && coverimage.trim() !== "" ? coverimage : null;

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        coverimage: coverimageData, // ✅ null if none
        author: { connect: { email: session.user.email! } },
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
