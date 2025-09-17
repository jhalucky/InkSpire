"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // If not logged in, redirect to signin
    if (!session) {
      router.push("/signin");
      return;
    }

    // If user hasn't completed profile, redirect to setup
    if (!session.user?.username) {
      router.push("/profile/setup");
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome, {session?.user?.name}!</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Username: {session?.user?.username}</p>
      <p>Avatar:</p>
      {session?.user?.avatar && (
        <Image
          src={session.user.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mt-2"
        />
      )}
    </div>
  );
}
