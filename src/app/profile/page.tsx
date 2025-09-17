import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return redirect("/signin");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <Image
        src={session.user.image ?? "/default-avatar.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <p className="text-lg mb-2">
        <strong>Name:</strong> {session.user.name}
      </p>
      <p className="text-lg mb-2">
        <strong>Email:</strong> {session.user.email}
      </p>
      <p className="text-lg">
        <strong>User ID:</strong> {session.user.id}
      </p>
    </div>
  );
}
