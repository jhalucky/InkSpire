// src/app/user/[username]/page.tsx
import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { Blog } from "@prisma/client";

type Props = { params: { username: string } };

export default async function UserProfilePage({ params }: Props) {
  const { username } = params;
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id ?? "";

  // Fetch user first
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

  // Return early if user not found
  if (!user) return <p>User not found</p>;

  // Define handleTipClick after user is guaranteed to exist
  const handleTipClick = (blog: typeof user.blogs[0]) => {
    console.log("Tip clicked for blog:", blog.id);
  };

  // Utility to extract username from social URLs
  const extractHandle = (url: string) => {
    try {
      const u = new URL(url);
      return "@" + u.pathname.replace(/^\/|\/$/g, "");
    } catch {
      return null;
    }
  };

  const twitterHandle = user.twitterUrl ? extractHandle(user.twitterUrl) : null;
  const instagramHandle = user.instagramUrl ? extractHandle(user.instagramUrl) : null;
  const linkedinHandle = user.linkedinUrl ? extractHandle(user.linkedinUrl) : null;
  const githubHandle = user.githubUrl ? extractHandle(user.githubUrl) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={user.image ?? "/images/default-user.png"}
          alt={user.name ?? "Unknown User"}
          height={80}
          width={80}
          className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-600"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name ?? "Unknown User"}</h1>
          <p className="text-gray-500">@{user.username}</p>
          {user.bio && (
            <p className="mt-2 text-gray-700 dark:text-gray-300">{user.bio}</p>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap gap-3 mt-3">
            {twitterHandle && (
              <a
                href={user.twitterUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-500 hover:underline"
              >
                {/* X (Twitter) Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.932 2.208-4.932 4.932 0 .39.045.765.127 1.124C7.69 8.094 4.066 6.13 1.64 3.161c-.427.733-.666 1.584-.666 2.49 0 1.72.875 3.236 2.202 4.123-.813-.026-1.577-.25-2.244-.622v.062c0 2.404 1.712 4.407 3.977 4.861-.417.113-.856.174-1.308.174-.32 0-.632-.031-.935-.088.633 1.976 2.466 3.414 4.637 3.451-1.7 1.332-3.84 2.126-6.162 2.126-.401 0-.797-.024-1.188-.07 2.198 1.41 4.807 2.234 7.608 2.234 9.127 0 14.11-7.563 14.11-14.11 0-.214-.005-.427-.014-.64.969-.7 1.807-1.574 2.469-2.572z"/>
                </svg>
                <span>{twitterHandle}</span>
              </a>
            )}

            {instagramHandle && (
              <a
                href={user.instagramUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-pink-500 hover:underline"
              >
                {/* Instagram Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
                </svg>
                <span>{instagramHandle}</span>
              </a>
            )}

            {linkedinHandle && (
              <a
                href={user.linkedinUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-700 hover:underline"
              >
                {/* LinkedIn Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.238-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.5 20h-2v-11h2v11zm-1-12.268c-.662 0-1.2-.537-1.2-1.199s.538-1.199 1.2-1.199c.661 0 1.2.537 1.2 1.199s-.539 1.199-1.2 1.199zm13.5 12.268h-2v-5.604c0-1.336-.027-3.055-1.862-3.055-1.863 0-2.148 1.454-2.148 2.956v5.703h-2v-11h1.922v1.507h.028c.268-.506.922-1.041 1.898-1.041 2.029 0 2.396 1.336 2.396 3.072v7.462z"/>
                </svg>
                <span>{linkedinHandle}</span>
              </a>
            )}

            {githubHandle && (
              <a
                href={user.githubUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-800 dark:text-gray-200 hover:underline"
              >
                {/* GitHub Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.95.58.11.79-.25.79-.55v-1.95c-3.2.69-3.87-1.54-3.87-1.54-.53-1.35-1.29-1.71-1.29-1.71-1.06-.72.08-.71.08-.71 1.18.08 1.81 1.21 1.81 1.21 1.04 1.78 2.73 1.27 3.39.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.45-2.69 5.42-5.25 5.71.42.37.8 1.1.8 2.22v3.29c0 .3.21.66.8.55C20.21 21.41 23.5 17.1 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/>
                </svg>
                <span>{githubHandle}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div className="space-y-6">
        {user.blogs.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No blogs yet.</p>
        ) : (
          user.blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} currentUserId={currentUserId} onTipClick={handleTipClick}/>
          ))
        )}
      </div>
    </div>
  );
}
