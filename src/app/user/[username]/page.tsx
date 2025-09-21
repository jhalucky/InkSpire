import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";

// Import Blog type from BlogCard
import type { Blog } from "@/components/BlogCard";

type Props = { params: { username: string } };

// Extend Blog type to match what prisma returns
type BlogWithRelations = Blog & {
  author: { id: string; name?: string; username?: string; image?: string } | null;
  likes: { id: string }[];
  comments: { content: string; author: { name?: string; image?: string } }[];
};

type UserWithBlogs = {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
  bio: string | null;
  twitterUrl?: string | null;
  blogs: BlogWithRelations[];
};

export default async function UserProfilePage({ params }: Props) {
  const { username } = params;

  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id || "";

  // Fetch user with blogs
  const user: UserWithBlogs | null = await prisma.user.findUnique({
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

  // Extract Twitter handle
  let twitterHandle: string | null = null;
  if (user.twitterUrl) {
    try {
      const url = new URL(user.twitterUrl);
      twitterHandle = "@" + url.pathname.replace("/", "").replace(/\/$/, "");
    } catch {
      twitterHandle = null;
    }
  }

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

          {user.twitterUrl && twitterHandle && (
            <a
              href={user.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 mt-2 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 1227"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M714 519 1160 0H1050L660 450 333 0H0l460 650L0 1227h110l360-420 342 420h333L714 519zM864 1106 516 666 873 121h90L618 562l345 544h-99z" />
              </svg>
              <span>{twitterHandle}</span>
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
