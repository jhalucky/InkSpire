"use client";

import { useSession } from "next-auth/react";
import Image from 'next/image';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="p-6">
      {session?.user ? (
        <div>
          <h1>Welcome, {session.user.name}</h1>
          <p>Email: {session.user.email}</p>
          <Image
            src={session.user.image ?? "/default-avatar.png"}
            alt="profile"
            className="w-16 h-16 rounded-full"
          />
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Write a blog
          </button>
        </div>
      ) : (
        <a
          href="signin"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in to Write a Blog
        </a>
      )}
    </div>
  );
}
