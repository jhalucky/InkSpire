"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

type Blog = {
  id: string;
  title: string;
  content: string;
};

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch blog by ID
  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Place cursor at the end
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = content.length;
      textareaRef.current.focus();
    }
  }, [content]);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) router.push("/profile");
    } catch (err) {
      console.error("Failed to update blog", err);
    }
  };

  if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Blog Content"
        rows={15}
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
