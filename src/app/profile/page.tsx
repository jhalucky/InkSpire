// app/profile/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Not signed in</h1>
        <Link
          href="/signin"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // Fake profile data for demo (replace with DB data later)
  const profileData = {
    avatar: session.user?.image || "", // fallback avatar
    bio: null,
    profession: null,
    education: null,
    location: null,
  };

  // Determine provider icon
  let ProviderIcon = null;
  if (session.user?.email?.includes("@gmail.com")) {
    ProviderIcon = <FcGoogle className="inline-block ml-2 text-xl" />;
  } else {
    ProviderIcon = <FaGithub className="inline-block ml-2 text-xl" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-6">
      <div className="flex flex-col items-center gap-4">
        {profileData.avatar ? (
          <img
            src={profileData.avatar}
            alt="User avatar"
            className="w-28 h-28 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xl font-bold">
            {session.user?.name?.charAt(0)}
          </div>
        )}

        <h1 className="text-3xl font-bold text-center">
          Hi {session.user?.name} {ProviderIcon}, welcome back!
        </h1>
        <p className="text-gray-600 text-center">
          Email: {session.user?.email}
        </p>
      </div>

      <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-3">
        <p>
          <span className="font-semibold">Bio: </span>
          {profileData.bio || "Not set yet"}
        </p>
        <p>
          <span className="font-semibold">Profession: </span>
          {profileData.profession || "Not set yet"}
        </p>
        <p>
          <span className="font-semibold">Education: </span>
          {profileData.education || "Not set yet"}
        </p>
        <p>
          <span className="font-semibold">Location: </span>
          {profileData.location || "Not set yet"}
        </p>
      </div>

      <Link
        href="/setup-profile"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Setup Profile
      </Link>
    </div>
  );
}
