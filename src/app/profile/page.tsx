import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/signin");

  // Check if email exists before querying
  if (!session.user?.email) return redirect("/signin");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  // Redirect to setup if user doesn't have a username yet
  if (!user?.username) return redirect("/profile/setup");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      {user.avatar && (
        <Image
          src={user.avatar}
          alt="Avatar"
          width={120}
          height={120}
          className="rounded-full"
        />
      )}
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-500">@{user.username}</p>
      <p>{user.bio}</p>
      <p>
        <strong>Profession:</strong> {user.profession}
      </p>
      <p>
        <strong>Education:</strong> {user.education}
      </p>
    </div>
  );
}
