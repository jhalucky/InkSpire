"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

type Blog = {
  id: string;
  title: string;
  content: string;
  author: { id: string; name?: string; username?: string; image?: string } | null;
  likes?: { id: string }[];
  comments?: { id: string; content: string; author: { name?: string; image?: string } }[];
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = "USER_ID_HERE"; 

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("API error 500");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("API error 500", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (blogs.length === 0) return <p className="text-center mt-10">No blogs found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      {blogs
        .filter((b) => b) // ensure no nulls
        .map((blog) => (
          <BlogCard key={blog.id} blog={blog} currentUserId={currentUserId} />
        ))}
    </div>
  );
}

