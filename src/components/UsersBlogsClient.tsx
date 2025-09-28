"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function UserBlogsClient({ blogs }: { blogs: any[] }) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id ?? "";
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog deleted!");
        router.refresh(); // refresh page to update UI
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (!blogs || blogs.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        This user hasn’t written any blogs yet.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-5 mt-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {blog.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
              {blog.content}
            </p>

            {/* Footer with actions */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>
                By{" "}
                {blog.author?.name ?? blog.author?.username ?? "Anonymous"}
              </span>
              {currentUserId === blog.authorId && (
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/blog/edit/${blog.id}`)}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Toast container */}
      <Toaster position="top-right" />
    </>
  );
}
