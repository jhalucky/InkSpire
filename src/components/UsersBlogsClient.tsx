// src/components/UserBlogsClient.tsx
"use client";

import BlogCard from "./BlogCard";
import { User } from "@prisma/client";

interface Props {
  blogs: any[]; // You can type it precisely
  currentUserId: string;
}

export default function UserBlogsClient({ blogs, currentUserId }: Props) {
  const handleTipClick = (blog: typeof blogs[0]) => {
    console.log("Tip clicked for blog:", blog.id);
  };

  return (
    <div className="space-y-6">
      {blogs.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={{ ...blog, comments: blog.comments ?? [] }}
            currentUserId={currentUserId}
            onTipClick={handleTipClick}
          />
        ))
      )}
    </div>
  );
}
