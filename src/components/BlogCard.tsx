"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, MoreVertical, Coffee, MessageSquare, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import TippingSystem from "./TippingSystem";
import InteractiveBlogFeatures from "./InteractiveBlogFeatures";

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

type Blog = {
  id: string;
  title: string;
  content: string;
  authorId?: string;
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
}: {
  blog: Blog;
  currentUserId: string;
}) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.comments ?? []);
  const [likes, setLikes] = useState(blog.likes ?? []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInteractiveFeatures, setShowInteractiveFeatures] = useState(false);

  // Post a comment
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

  // Toggle like
  const handleLike = async () => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}/like`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to toggle like");
      const data = await res.json(); // { liked: boolean, likesCount: number }
      setLikes(new Array(data.likesCount).fill({ id: currentUserId }));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete blog
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

  // Edit blog
  const handleEdit = () => {
    router.push(`/blog/create?id=${blog.id}`); // redirect to same page with query param
  };

  return (
    <article className="group relative card-modern hover-lift animate-fade-in-up overflow-hidden">
      {/* Three-dot menu for blog owner */}
      {currentUserId === blog.authorId && (
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-popover border border-border shadow-lg rounded-lg text-sm z-20">
              <button
                onClick={handleEdit}
                className="w-full text-left px-3 py-2 hover:bg-accent rounded-t-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full text-left px-3 py-2 text-destructive hover:bg-accent rounded-b-lg transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

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
            <TippingSystem 
              authorId={blog.authorId || ""}
              authorName={blog.author?.name || "Unknown Author"}
              authorImage={blog.author?.image || undefined}
              onTip={(amount, message) => {
                console.log(`Tipped $${amount} with message: ${message}`);
              }}
            />
            
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

        {/* Comments Preview */}
        {comments.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium text-foreground mb-3">
              Comments ({comments.length})
            </p>
            <div className="space-y-3">
              {comments.slice(0, 2).map((c) => (
                <div key={c.id} className="flex items-start gap-3">
                  <Link href={`/user/${blog.author?.username ?? ""}`} className="flex-shrink-0">
                    <Image
                      src={c.author?.image ?? fallbackImage}
                      alt={c.author?.name ?? "Anonymous"}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full object-cover border border-border"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{c.author?.name ?? "Anonymous"}</span>
                      <span className="text-muted-foreground ml-1">•</span>
                      <span className="text-muted-foreground ml-1">{c.content}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Comment */}
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!comment.trim()}
            >
              Post
            </button>
          </div>
        </div>

        {/* Interactive Features */}
        {showInteractiveFeatures && (
          <div className="border-t border-border pt-4 mt-4">
            <InteractiveBlogFeatures 
              blogId={blog.id}
              onVote={(pollId, optionId) => {
                console.log(`Voted on poll ${pollId}: ${optionId}`);
              }}
              onQuizAnswer={(quizId, answerId) => {
                console.log(`Answered quiz ${quizId}: ${answerId}`);
              }}
              onHighlightComment={(highlightId, comment) => {
                console.log(`Commented on highlight ${highlightId}: ${comment}`);
              }}
            />
          </div>
        )}
      </div>
    </article>
  );
}
