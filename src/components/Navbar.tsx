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
              signOut({ callbackUrl: "/signin" });
            } else {
              console.log("Redirecting to create blog page...");
            }
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Write a Blog
        </button>

        {/* Conditional rendering for Profile or Sign In */}
        {session ? (
          <Link href="/profile">
            {session.user?.image ? (
              <div className="w-10 h-10 min-w-[40px] min-h-[40px] relative rounded-full overflow-hidden">
                <Image
                  src={session.user.image}
                  alt="User Avatar"
                  fill
                  className="object-cover w-full h-full cursor-pointer"
                />
              </div>
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
