// src/app/profile/setup/page.tsx
"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileSetupPage() {
  const { data: session, update } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!username) {
      setError("Username is required.");
      setLoading(false);
      return;
    }

    const usernameRegex = /^[a-z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setError("Username must be 3-20 characters, lowercase, alphanumeric, and can include underscores.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/profile/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update the session with the new username
        await update({ ...session?.user, username: data.user.username });
        router.push("/profile");
      } else {
        setError(data.error || "Failed to set up profile.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Please sign in.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="bg-gray-800 text-gray-200 rounded-lg shadow-xl p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Complete Your Profile
        </h1>
        <div className="flex flex-col items-center gap-4 mb-6">
          {user.image && (
            <Image
              src={user.image}
              alt="User Image"
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-400">{user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Choose a Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-600"} rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition`}
              placeholder="e.g., inkspire_user"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm mt-1 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save and Continue"}
          </button>
        </form>
        <button
          onClick={() => signOut()}
          className="w-full mt-4 text-sm text-gray-500 hover:text-gray-400 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}