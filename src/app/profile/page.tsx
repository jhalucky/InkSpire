// app/profile/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // If not signed in
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Not signed in</h1>
        <Link
          href="/signin"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // Dummy placeholder until user sets profile
  const profileSet = false; // Change to true once user fills data
  const userData = {
    avatar: session.user?.image || "/default-avatar.png",
    name: session.user?.name || "User",
    email: session.user?.email || "Not provided",
    bio: "Not set yet",
    profession: "Not set yet",
    education: "Not set yet",
  };

  if (!profileSet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 gap-4 text-center">
        <Image
          src={userData.avatar}
          alt="Avatar"
          width={120}
          height={120}
          className="rounded-full border-2 border-gray-300 dark:border-gray-700"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Hi {userData.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your profile is not set up yet.
        </p>
        <Link
          href="/setup-profile"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
        >
          Set Up Profile
        </Link>
      </div>
    );
  }

  // Render full profile once data is available
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 gap-4 text-center">
      <Image
        src={userData.avatar}
        alt="Avatar"
        width={150}
        height={150}
        className="rounded-full border-2 border-gray-300 dark:border-gray-700"
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{userData.name}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{userData.email}</p>
      <p className="text-gray-700 dark:text-gray-200">Bio: {userData.bio}</p>
      <p className="text-gray-700 dark:text-gray-200">Profession: {userData.profession}</p>
      <p className="text-gray-700 dark:text-gray-200">Education: {userData.education}</p>
      <Link
        href="/setup-profile"
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold mt-4 transition"
      >
        Edit Profile
      </Link>
    </div>
  );
}
