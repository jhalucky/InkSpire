// app/user/[username]/page.tsx
import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";

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
        include: {
          author: true,
          likes: true,
          comments: { include: { author: true } },
        },
      },
    },
  });

  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={user.image || "/images/default-user.png"}
          alt={user.name || "Unknown User"}
          height={80}
          width={80}
          className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-600"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name || "Unknown User"}</h1>
          <p className="text-gray-500">@{user.username}</p>
          {user.bio && (
            <p className="mt-2 text-gray-700 dark:text-gray-300">{user.bio}</p>
          )}

          {/* Twitter Link */}
          {user.twitterUrl && (
            <a
              href={user.twitterUrl || undefined} // fix null issue
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 mt-2 hover:underline"
            >
              {/* Twitter SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.5 0c-2.63 0-4.52 2.24-4.52 4.72 0 .37.04.73.11 1.07A12.94 12.94 0 0 1 3 1.67a4.72 4.72 0 0 0-.61 2.38c0 1.64.81 3.1 2.06 3.96a4.5 4.5 0 0 1-2.05-.58v.06c0 2.29 1.55 4.2 3.62 4.64a4.56 4.56 0 0 1-2.04.08c.58 1.87 2.25 3.23 4.24 3.27A9.06 9.06 0 0 1 0 19.54 12.8 12.8 0 0 0 6.92 21c8.3 0 12.85-7.1 12.85-13.26 0-.2 0-.39-.01-.58A9.35 9.35 0 0 0 23 3z" />
              </svg>
              <span>{user.twitterHandle || user.username}</span>
            </a>
          )}
        </div>
      </div>

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
