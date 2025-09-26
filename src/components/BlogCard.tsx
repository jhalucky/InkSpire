"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Coffee, MessageSquare, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

type Blog = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: { name?: string | null; username?: string | null; image?: string | null } | null;
  likes?: { id: string }[];
  comments?: {
    id: string;
    content: string;
    author: { name?: string | null; image?: string | null };
  }[];
};

export default function BlogCard({
  blog,
  currentUserId,
  onTipClick,
}: {
  blog: Blog;
  currentUserId: string;
  onTipClick: (blog: Blog) => void;
}) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.comments ?? []);
  const [likes, setLikes] = useState(blog.likes ?? []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInteractiveFeatures, setShowInteractiveFeatures] = useState(false);

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

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}/like`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to toggle like");
      const data = await res.json();
      setLikes(new Array(data.likesCount).fill({ id: currentUserId }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    router.push(`/blog/create?id=${blog.id}`);
  };

  return (
    <article className="group relative card-modern hover-lift animate-fade-in-up overflow-hidden">
      <div className="p-6">
        {/* Author */}
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/user/${blog.author?.username ?? ""}`} className="flex-shrink-0 group/avatar">
            <div className="relative">
              <Image
                src={blog.author?.image ?? fallbackImage}
                alt={blog.author?.name ?? "Unknown Author"}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover/avatar:border-indigo-500 transition-all duration-300 group-hover/avatar:scale-110"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-0 group-hover/avatar:opacity-20 transition-opacity duration-300 blur"></div>
            </div>
          </Link>
          <div className="min-w-0 flex-1">
            <Link href={`/user/${blog.author?.username ?? ""}`}>
              <p className="font-semibold text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate">
                {blog.author?.name ?? "Unknown Author"}
              </p>
            </Link>
            <p className="text-sm text-muted-foreground truncate">
              @{blog.author?.username ?? "unknown"}
            </p>
          </div>
        </div>

        {/* Title & Content */}
        <div className="mb-6">
          <Link href={`/blog/${blog.id}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 group-hover:gradient-text">
              {blog.title}
            </h2>
          </Link>
          <p className="text-muted-foreground line-clamp-3 leading-relaxed text-base">
            {blog.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                likes.some((l) => l.id === currentUserId)
                  ? "text-red-500 bg-red-50 dark:bg-red-950/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Heart className={`w-4 h-4 ${likes.some((l) => l.id === currentUserId) ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{likes.length}</span>
            </button>

            <button
              onClick={() => setShowInteractiveFeatures(!showInteractiveFeatures)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Interactive</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
          <button
  onClick={() => router.push(`/tipping?authorId=${blog.authorId}`)}
  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  <Coffee className="w-4 h-4" />
  <span>Tip Author</span>
</button>



            <Link
              href={`/blog/${blog.id}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Read More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}