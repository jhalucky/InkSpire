"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Inkspire</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* "Write a Blog" Button */}
        <button
          onClick={() => {
            if (!session) {
              signIn("google"); // Redirect to sign-in if not logged in
            } else {
              // Redirect to create blog page if logged in
              // We'll create this page later
              console.log("Redirecting to create blog page...");
            }
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Write a Blog
        </button>

        {/* Conditional rendering for Profile or Sign Up */}
        {session ? (
          <Link href="/profile">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full cursor-pointer"
              />
            ) : (
              <span className="text-sm cursor-pointer">Profile</span>
            )}
          </Link>
        ) : (
          <Link href="/signin">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}