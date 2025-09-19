"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-2">
        <Link href="/profile">
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
            Profile
          </button>
        </Link>
        <button
          onClick={() => signOut()}
          className="rounded-md bg-red-500 px-4 py-2 text-white"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="rounded-md bg-green-500 px-4 py-2 text-white"
    >
      Sign in
    </button>
  );
}