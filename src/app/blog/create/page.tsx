"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AIWritingAssistant from "@/components/AIWritingAssistant";
import SocialSnippets from "@/components/SocialSnippets";
import AICoverImageGenerator from "@/components/AICoverImageGenerator";

export default function CreateBlogPage({ blog }: { blog?: any }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coverImage, setCoverImage] = useState(blog?.coverImage || "");

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
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {blog ? "Edit Blog" : "Write a Blog"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {blog ? "Update your story" : "Share your thoughts with the world"}
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
                placeholder="Enter your blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Content
              </label>
              
              {/* Enhanced Toolbar */}
              <div className="flex flex-wrap gap-2 mb-3 p-3 bg-muted/50 rounded-lg border border-border">
                <button 
                  type="button" 
                  onClick={() => applyFormat("**")} 
                  className="px-3 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  <strong>B</strong>
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormat("*")} 
                  className="px-3 py-2 bg-background border border-input rounded-md text-sm font-medium italic hover:bg-accent transition-colors"
                >
                  <em>I</em>
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormat("~~")} 
                  className="px-3 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  <s>S</s>
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormat("# ", "")} 
                  className="px-3 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  H1
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormat("## ", "")} 
                  className="px-3 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  H2
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormat("### ", "")} 
                  className="px-3 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  H3
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormat("> ", "")} 
                  className="px-3 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  Quote
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormat("- ", "")} 
                  className="px-3 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  List
                </button>
              </div>

              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={15}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground resize-none"
                placeholder="Write your blog here... Use the toolbar above to format your text with markdown."
              />
              
              <div className="mt-2 text-xs text-muted-foreground">
                {content.length} characters
              </div>
            </div>

            {/* AI Writing Assistant */}
            <AIWritingAssistant 
              content={content}
              title={title}
              onSuggestionApply={(suggestion) => {
                // Apply suggestion to content
                setContent((prev: string) => prev + '\n\n' + suggestion);
              }}
            />

            {/* AI Cover Image Generator */}
            {title && (
              <AICoverImageGenerator
                title={title}
                content={content}
                onImageGenerated={(imageUrl) => setCoverImage(imageUrl)}
              />
            )}

            {/* Social Media Snippets */}
            {title && content && (
              <SocialSnippets
                title={title}
                content={content}
                authorName={session?.user?.name || "Author"}
                authorUsername={session?.user?.username || "author"}
                blogUrl={`https://inkspire.com/blog/${blog?.id || 'new'}`}
              />
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none sm:px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
              </button>
              
              <button
                type="button"
                className="flex-1 sm:flex-none sm:px-8 py-3 bg-muted text-muted-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
