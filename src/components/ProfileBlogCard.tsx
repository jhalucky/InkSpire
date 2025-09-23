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
  currentUserId: string;
  onDelete: (id: string) => void;
}


export default function ProfileBlogCard({
  blog,
  currentUserId,
  onDelete,
}: ProfileBlogCardProps) {
  const formattedDate = blog.createdAt
    ? format(new Date(blog.createdAt), "dd MMM yyyy, hh:mm a")
    : "";

  return (
    <div className="p-6 mb-4 rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {blog.title}
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{blog.content}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>❤️ {blog._count?.likes ?? 0} Likes</span>
        <span>💬 {blog._count?.comments ?? 0} Comments</span>
        <span>{formattedDate}</span>
        {currentUserId && (
          <button
            onClick={() => onDelete(blog.id)}
            className="ml-4 text-red-600 hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

