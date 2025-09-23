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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Discover Stories</h1>
        <p className="text-muted-foreground">
          Explore amazing stories from our community of writers
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
          All
        </button>
        <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
          Trending
        </button>
        <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
          Recent
        </button>
        <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
          Popular
        </button>
      </div>

      {/* Blogs Grid */}
      <div className="space-y-6">
        {blogs
          .filter((b) => b) // ensure no nulls
          .map((blog) => (
            <BlogCard key={blog.id} blog={blog} currentUserId={currentUserId} />
          ))}
      </div>

      {/* Load More */}
      {blogs.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors">
            Load More Stories
          </button>
        </div>
      )}
    </div>
  );
}

