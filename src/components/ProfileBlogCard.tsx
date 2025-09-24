"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId?: string;
  _count: {
    likes: number;
    comments: number;
  };
}

interface ProfileBlogCardProps {
  blog: Blog;
  currentUserId: string;
  onDelete: (id: string) => void;
}

export default function ProfileBlogCard({
  blog,
  currentUserId,
  onDelete,
}: ProfileBlogCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = blog.createdAt
    ? format(new Date(blog.createdAt), "dd MMM yyyy, hh:mm a")
    : "";

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blog/${blog.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");

      onDelete(blog.id);
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting blog");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 mb-4 rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
      {/* Title */}
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {blog.title}
      </h2>

      {/* Content */}
      <p className="mb-4 text-gray-700 dark:text-gray-300">{blog.content}</p>

      {/* Footer: Likes, Comments, Date, Actions */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        {/* Likes & Comments */}
        <div className="flex gap-4">
          <span>❤️ {blog._count?.likes ?? 0} Likes</span>
          <span>💬 {blog._count?.comments ?? 0} Comments</span>
        </div>

        {/* Date & Author Actions */}
        <div className="flex items-center gap-4">
          <span>{formattedDate}</span>

          {/* Edit/Delete only if current user is the author */}
          {currentUserId === blog.authorId && (
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/blog/edit/${blog.id}`)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 hover:underline disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
