import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // Get the session
  const session = await getServerSession(authOptions);

  // If no session, redirect to signin
  if (!session?.user?.email) return redirect("/signin");

  // Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // If user not found, redirect to signin
  if (!user) return redirect("/signin");

  // If user has no username yet, redirect to setup
  if (!user.username) return redirect("/profile/setup");

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
      {user.bio && <p>{user.bio}</p>}
      {user.profession && (
        <p>
          <strong>Profession:</strong> {user.profession}
        </p>
      )}
      {user.education && (
        <p>
          <strong>Education:</strong> {user.education}
        </p>
      )}
    </div>
  );
}
