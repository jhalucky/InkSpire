import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Fixed import path
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // ✅ Fixed: Proper null checking without unsafe assertion
  if (!session?.user?.email) {
    return redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return redirect("/signin");
  }

  // Redirect to setup if user doesn't have a username
  if (!user.username) {
    return redirect("/profile/setup");
  }

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
      {user.bio && <p className="text-center max-w-md">{user.bio}</p>}
      {user.profession && (
        <p><strong>Profession:</strong> {user.profession}</p>
      )}
      {user.education && (
        <p><strong>Education:</strong> {user.education}</p>
      )}
    </div>
  );
}