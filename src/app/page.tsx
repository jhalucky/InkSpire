"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: { name: string | null; username: string | null; image: string | null };
  comments: { id: string }[];
  likes: { id: string }[];
};

export default function HomePage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 text-center">Inkspire</h1>
      <p className="mt-2 text-lg text-gray-600 text-center">
        The home of your next great blog post.
      </p>

      <div className="text-center my-6">
        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Sign in to write a blog
          </button>
        ) : (
          <Link href="/blog/create">
            <button className="rounded-md bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700">
              Create a Blog Post
            </button>
          </Link>
        )}
      </div>

      <div className="space-y-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                {blog.author.image ? (
                  <Image
                    src={blog.author.image}
                    alt={blog.author.name || "Author"}
                    width={300}   // specify width
  height={200}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    {blog.author.name?.[0] || "U"}
                  </div>
                )}
                <div>
                  <h3 className="font-bold">{blog.author.name || "Unknown"}</h3>
                  <p className="text-sm text-gray-400">@{blog.author.username || "unknown"}</p>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-200 mb-4">{blog.content.slice(0, 200)}...</p>
              <div className="flex gap-4 text-gray-400 text-sm">
                <span>{blog.likes.length} Likes</span>
                <span>{blog.comments.length} Comments</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
