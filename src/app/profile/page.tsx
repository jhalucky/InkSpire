"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// The profile card component to be displayed on the page
const ProfileCard = ({ session }: { session: any }) => {
  const user = session.user;

  // Function to render the Twitter URL with the new X logo
  const renderTwitterUrl = () => {
    if (!user.twitterUrl) {
      return "Not Set";
    }

    // Extract the username from the URL
    const username = user.twitterUrl.split('/').pop();

    return (
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.901 1.15391H21.393L14.07 9.38091L22.84 22.8399H15.93L10.978 15.6599L4.99201 22.8399H2.5L10.375 13.4359L1.93901 1.15391H9.08801L13.882 7.50291L18.901 1.15391ZM16.711 20.6589H18.236L7.75301 3.32391H6.12601L16.711 20.6589Z"
            fill="currentColor"
          />
        </svg>
        <a
          href={user.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          @{username}
        </a>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white rounded-lg shadow-lg max-w-xl mx-auto my-12 relative">
      {/* Edit Profile Button */}
      <Link href="/profile/setup" className="absolute top-4 right-4">
        <button className="text-gray-500 hover:text-white transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L15.232 5.232z"
            />
          </svg>
        </button>
      </Link>

      {/* Profile Image with placeholder */}
      {user.image && (
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={user.image}
            alt="Profile Avatar"
            fill
            className="rounded-full object-cover border-4 border-gray-700"
          />
        </div>
      )}

      {/* User Info */}
      <h2 className="text-2xl font-bold">{user.name || "User"}</h2>
      <p className="text-gray-500 text-sm mt-1">
        @{user.username || "Not Set"}
      </p>

      {/* Profile Details */}
      <div className="mt-6 w-full text-left space-y-2">
        <div>
          <span className="font-semibold text-gray-400">Bio:</span>{" "}
          <span className="text-gray-200">
            {user.bio || "Not Set"}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Profession:</span>{" "}
          <span className="text-gray-200">
            {user.profession || "Not Set"}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Education:</span>{" "}
          <span className="text-gray-200">
            {user.education || "Not Set"}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Twitter:</span>{" "}
          {renderTwitterUrl()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col w-full gap-2">
        <button
          onClick={() => signOut()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(true);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Only redirect if there's no session at all
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>
      <ProfileCard session={session} />
    </div>
  );
}