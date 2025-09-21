"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

type Blog = {
  id: string;
  title: string;
  content: string;
  author: { id: string; name?: string; username?: string; image?: string } | null;
  likes?: { id: string }[];
  comments?: { id: string; content: string; author: { name?: string; image?: string } }[];
};

export default function BlogCard({
  blog,
  currentUserId,
}: {
  blog: Blog;
  currentUserId: string;
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.comments ?? []);
  const [likes, setLikes] = useState(blog.likes ?? []);

  // Handle posting a comment
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const res = await fetch(`/api/blogs/${blog.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: comment, authorId: currentUserId }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle like on frontend
  const handleLike = () => {
    const hasLiked = likes.some((like) => like.id === currentUserId);
    setLikes(hasLiked ? likes.filter((l) => l.id !== currentUserId) : [...likes, { id: currentUserId }]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 mb-6 transition-transform hover:scale-[1.01]">
      
      {/* Author */}
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={blog.author?.image || fallbackImage}
          alt={blog.author?.name || "Unknown Author"}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
        />
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">{blog.author?.name || "Unknown Author"}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{blog.author?.username || "unknown"}</p>
        </div>
      </div>

      {/* Title & Content */}
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{blog.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{blog.content}</p>

      {/* Like & Read More */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition ${
            likes.some((l) => l.id === currentUserId) ? "text-red-500" : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>{likes.length}</span>
        </button>

        <Link
          href={`/blog/${blog.id}`}
          className="text-blue-500 dark:text-blue-400 hover:underline font-medium text-sm"
        >
          Read More →
        </Link>
      </div>

      {/* Comments */}
      <div className="mt-2">
        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Comments ({comments.length})</p>
        {comments.slice(0, 2).map((c) => (
          <div key={c.id} className="flex items-start gap-2 mb-2">
            <Image
              src={c.author?.image || fallbackImage}
              alt={c.author?.name || "Anonymous"}
              width={28}
              height={28}
              className="w-7 h-7 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">{c.author?.name || "Anonymous"}:</span> {c.content}
            </p>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          Post
        </button>
      </div>
    </div>
  );
}
