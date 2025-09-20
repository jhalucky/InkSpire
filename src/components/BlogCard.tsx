"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name?: string | null;
    username?: string | null;
    image?: string | null;
  } | null;
  likes?: { id: string; userId: string }[];
  comments?: {
    id: string;
    content: string;
    author?: { name?: string | null; image?: string | null };
  }[];
}

interface BlogCardProps {
  blog: Blog;
  currentUserId: string;
}

export default function BlogCard({ blog, currentUserId }: BlogCardProps) {
  const [likes, setLikes] = useState(blog.likes?.length || 0);
  const [liked, setLiked] = useState(blog.likes?.some((like) => like.userId === currentUserId) || false);
  const [comments, setComments] = useState(blog.comments || []);
  const [newComment, setNewComment] = useState("");

  const authorName = blog.author?.name || "Unknown";
  const authorUsername = blog.author?.username || "unknown";
  const authorImage = blog.author?.image || "https://www.flaticon.com/svg/static/icons/svg/1144/1144760.svg";

  // Toggle like
  const handleLike = async () => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}/like`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to toggle like");

      const data = await res.json();
      setLikes(data.likesCount);
      setLiked(data.liked);
    } catch (err) {
      console.error(err);
    }
  };

  // Post comment
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`/api/blogs/${blog.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      if (!res.ok) throw new Error("Failed to post comment");

      const data = await res.json();
      setComments([...comments, data]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      {/* Author Info */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 relative rounded-full overflow-hidden">
          <Image src={authorImage} alt={authorUsername} width={40} height={40} className="object-cover" />
        </div>
        <div className="flex flex-col ml-3">
          <span className="font-bold text-lg">{authorName}</span>
          <span className="text-sm text-gray-600">@{authorUsername}</span>
        </div>
      </div>

      {/* Blog Content */}
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-700 mb-2">
        {blog.content.length > 150 ? `${blog.content.slice(0, 150)}...` : blog.content}
      </p>

      {blog.content.length > 150 && (
        <Link href={`/blog/${blog.id}`} className="text-blue-500 font-medium hover:underline">
          Read more
        </Link>
      )}

      {/* Likes & Comments */}
      <div className="flex items-center mt-3 gap-4">
        <button onClick={handleLike} className={`text-xl focus:outline-none ${liked ? "text-red-500" : ""}`}>
          {liked ? "❤️" : "🤍"}
        </button>
        <span>{likes} {likes === 1 ? "like" : "likes"}</span>
        <div className="flex items-center gap-1">
          💬 {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </div>
      </div>

      {/* Comment Input */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button onClick={handleCommentSubmit} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Post
        </button>
      </div>

      {/* Show last 2 comments */}
      <div className="mt-2 space-y-1">
        {comments.slice(-2).map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            <div className="w-6 h-6 relative rounded-full overflow-hidden">
              <Image
                src={c.author?.image || "https://www.flaticon.com/svg/static/icons/svg/1144/1144760.svg"}
                alt={c.author?.name || "Anonymous"}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">{c.author?.name || "Anonymous"}:</span> {c.content}
            </p>
          </div>
        ))}
        {comments.length > 2 && (
          <Link href={`/blog/${blog.id}`} className="text-blue-500 text-sm hover:underline">
            View all comments
          </Link>
        )}
      </div>
    </div>
  );
}
