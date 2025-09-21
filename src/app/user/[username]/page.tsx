// app/user/[username]/page.tsx
import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";

// ProfileCard component integrated
const fallbackImage = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

interface UserProfile {
  name?: string | null;
  username: string;
  image?: string | null;
  bio?: string | null;
  twitterUrl?: string | null;
}

function ProfileCard({ user }: { user: UserProfile }) {
  const twitterHandle = user.twitterUrl?.split("https://twitter.com/")[1] || null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 mb-8 flex items-center gap-4">
      <Image
        src={user.image || fallbackImage}
        alt={user.name || "Unknown User"}
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-600"
      />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {user.name || "Unknown User"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>

        {twitterHandle && (
          <a
            href={user.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 mt-1 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 
                1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.003.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-2.717 
                0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.72-2.164-10.148-5.144-.423.722-.666 
                1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 
                1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 
                1.956 2.444 3.377 4.6 3.417-1.68 1.319-3.809 2.107-6.102 2.107-.396 0-.788-.023-1.175-.069 
                2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.637.961-.689 
                1.8-1.56 2.46-2.548l-.047-.02z" />
            </svg>
            <span>{twitterHandle}</span>
          </a>
        )}

        {user.bio && <p className="mt-2 text-gray-700 dark:text-gray-300">{user.bio}</p>}
      </div>
    </div>
  );
}

type Props = { params: { username: string } };

export default async function UserProfilePage({ params }: Props) {
  const { username } = params;

  // Get current logged-in user ID for likes
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id || "";

  // Fetch the user by username and their blogs
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      blogs: {
        orderBy: { createdAt: "desc" },
        include: { author: true, likes: true, comments: { include: { author: true } } },
      },
    },
  });

  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <ProfileCard user={user} />

      {/* User's Blogs */}
      <div className="space-y-6">
        {user.blogs.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No blogs yet.</p>
        ) : (
          user.blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} currentUserId={currentUserId} />
          ))
        )}
      </div>
    </div>
  );
}
