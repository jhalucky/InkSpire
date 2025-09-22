"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBlogPage({ blog }: { blog?: any }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!session) {
    router.push("/signin");
    return null;
  }

  const applyFormat = (syntax: string, closingSyntax?: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);

    const newText = `${before}${syntax}${selectedText}${closingSyntax || syntax}${after}`;
    setContent(newText);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(blog ? "/api/blog/update" : "/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blog?.id,
          title,
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/"); // redirect to feed
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{blog ? "Edit Blog" : "Write a Blog"}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your blog title"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Content</label>
          {/* Toolbar */}
          <div className="flex gap-2 mb-2">
            <button type="button" onClick={() => applyFormat("**")} className="px-2 py-1 bg-gray-700 rounded">B</button>
            <button type="button" onClick={() => applyFormat("*")} className="px-2 py-1 bg-gray-700 rounded italic">I</button>
            <button type="button" onClick={() => applyFormat("~~")} className="px-2 py-1 bg-gray-700 rounded">S</button>
            <button type="button" onClick={() => applyFormat("# ", "")} className="px-2 py-1 bg-gray-700 rounded">H1</button>
            <button type="button" onClick={() => applyFormat("## ", "")} className="px-2 py-1 bg-gray-700 rounded">H2</button>
          </div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your blog here..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
