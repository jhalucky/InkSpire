"use client";

import { format } from "date-fns";

interface ProfileBlogCardProps {
  blog: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    _count: {
      likes: number;
      comments: number;
    };
  };
}

export default function ProfileBlogCard({ blog }: ProfileBlogCardProps) {
  return (
    <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {blog.title}
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{blog.content}</p>

      <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>❤️ {blog._count?.likes || 0} Likes</span>
        <span>💬 {blog._count?.comments || 0} Comments</span>
        <span>
          {blog.createdAt
            ? format(new Date(blog.createdAt), "dd MMM yyyy, hh:mm a")
            : ""}
        </span>
      </div>
    </div>
  );
}
