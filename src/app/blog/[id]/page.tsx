"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: { name: string | null; username: string | null; image: string | null };
  comments: { id: string; content: string; author: { name: string | null; image: string | null } }[];
  likes: { id: string }[];
};

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        {blog.author.image ? (
          <Image
            src={blog.author.image}
            alt={blog.author.name || "Author"}
            width={40}
            height={40}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            {blog.author.name?.[0] || "U"}
          </div>
        )}
        <div>
          <h3 className="font-bold">{blog.author.name || "Unknown"}</h3>
          <p className="text-sm text-gray-500">@{blog.author.username || "unknown"}</p>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-6">
        {blog.content}
      </p>

      <div className="flex gap-6 text-gray-600 text-sm mb-6">
        <span>❤️ {blog.likes.length} Likes</span>
        <span>💬 {blog.comments.length} Comments</span>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {blog.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {blog.comments.map((comment) => (
              <li key={comment.id} className="p-3 bg-gray-500 rounded-md flex items-center gap-2">
                <Image
                  src={comment.author?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt={comment.author?.name || "Anonymous"}
                   width={40}
  height={40}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{comment.author?.name || "Anonymous"}</p>
                  <p>{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
