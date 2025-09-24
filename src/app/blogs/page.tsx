"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/BlogCard";

type Blog = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  author: { id: string; name?: string; username?: string; image?: string } | null;
  likes?: { id: string }[];
  comments?: { id: string; content: string; author: { name?: string; image?: string } }[];
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const currentUserId = "USER_ID_HERE"; // replace with actual user id or session

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

  const handleTipClick = (blog: Blog) => {
    router.push(`/tipping?blogId=${blog.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-5 md:mt-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Discover Stories</h1>
        <p className="text-muted-foreground">
          Explore amazing stories from our community of writers
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="space-y-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            currentUserId={currentUserId}
            onTipClick={handleTipClick} // ✅ pass the function here
          />
        ))}
      </div>
    </div>
  );
}
