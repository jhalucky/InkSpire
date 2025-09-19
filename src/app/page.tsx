"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Inkspire</h1>
      <p className="mt-2 text-lg text-gray-600">
        The home of your next great blog post.
      </p>

      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="mt-6 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none"
        >
          Sign in to write a blog
        </button>
      ) : (
        <Link href="/blogs/create">
          <button className="mt-6 rounded-md bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none">
            Create a Blog Post
          </button>
        </Link>
      )}
    </div>
  );
}