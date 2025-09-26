// src/app/user/[username]/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserBlogsClient from "@/components/UsersBlogsClient";

type Props = { params: { username: string } };

export default async function UserProfilePage({ params }: Props) {
  const { username } = params;
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id ?? "";

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      blogs: {
        orderBy: { createdAt: "desc" },
        include: { author: true, likes: true, comments: { include: { author: true } } },
      },
    },
  });

  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile info here (Image, Name, Socials) */}
      
      {/* Blogs */}
      <UserBlogsClient blogs={user.blogs} currentUserId={currentUserId} />
    </div>
  );
}
