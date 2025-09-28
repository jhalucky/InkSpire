"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReadingModes from "@/components/ReadingModes";
import { Heart, MessageSquare } from "lucide-react";

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: { name: string | null; username: string | null; image: string | null };
  comments: { id: string; content: string; author: { name: string | null; image: string | null } }[] | undefined;
  likes: { id: string }[] | undefined;
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

  // Function to simulate reading time logic for display (based on word count/Prisma date)
  const getMetadata = () => {
    const minutes = Math.ceil(blog.content.length / 500); 
    const date = new Date(blog.createdAt);
    return {
      readingTime: `~${minutes} min read`,
      publishedAt: date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    };
  };

  const metadata = getMetadata();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
      {/* Author Info */}
      <div className="flex items-center gap-4 mb-8">
        {blog.author.image ? (
          <Image
            src={blog.author.image}
            alt={blog.author.name || "Author"}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-bold">
            {blog.author.name?.[0] || "U"}
          </div>
        )}
        <div>
          <h3 className="font-bold text-lg">{blog.author.name || "Unknown Author"}</h3>
          <p className="text-sm text-gray-400">@{blog.author.username || "unknown"}</p>
        </div>
      </div>

      {/* Post Title & Metadata */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-3">{blog.title}</h1>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>{metadata.readingTime}</span>
          <span>•</span>
          <span>Published on {metadata.publishedAt}</span>
        </div>
      </div>

      {/* Reading Modes & Controls */}
      <div className="mb-20 pb-4 border-t">
        <ReadingModes
          content={blog.content}
          title={blog.title}
          metadata={metadata}
          onModeChange={(mode) => console.log("Mode changed to:", mode)}
        />
      </div>

      
      <div className="flex gap-8 text-gray-400 text-base py-4 border-t border-b border-gray-700">
        <span className="flex items-center gap-2 font-medium ml-5">
          <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
          {(blog.likes?.length ?? 0)} Likes
        </span>
        <span className="flex items-center gap-2 font-medium">
          <MessageSquare className="w-5 h-5" />
          {(blog.comments?.length ?? 0)} Comments
        </span>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Comments ({blog.comments?.length ?? 0})</h2>
        {!blog.comments || blog.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to start a discussion!</p>
        ) : (
          <ul className="space-y-6">
            {blog.comments.map((comment) => (
              <li key={comment.id} className="p-4 bg-gray-800 rounded-lg flex items-start gap-4">
                <Image
                  src={comment.author?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt={comment.author?.name || "Anonymous"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-200 mb-1">{comment.author?.name || "Anonymous"}</p>
                  <p className="text-gray-300 text-base">{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
