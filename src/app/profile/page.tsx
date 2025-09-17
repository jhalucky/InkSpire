import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.username) {
    // Redirect new users to setup
    redirect("/profile/setup");
  }

  return (
    <div>
      <h1>Welcome, {session.user.username || session.user.name}!</h1>
      <Image src={session.user.avatar || "/default-avatar.png"} alt="Avatar" />
    </div>
  );
}
