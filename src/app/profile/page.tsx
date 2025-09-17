"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // wait for session
    if (!session?.user?.email) {
      router.push("/signin");
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {session.user.name}</h1>
      <p className="mb-4">Email: {session.user.email}</p>
      {session.user.image && (
        <Image
          src={session.user.image}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
      )}
      <button
        onClick={() => router.push("/profile/setup")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Edit Profile
      </button>
    </div>
  );
}
