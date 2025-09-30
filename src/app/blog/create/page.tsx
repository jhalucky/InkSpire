"use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import AIWritingAssistant from "@/components/AIWritingAssistant";
// import SocialSnippets from "@/components/SocialSnippets";
// import AICoverImageGenerator from "@/components/AICoverImageGenerator";
// import toast from "react-hot-toast";

// export default function CreateBlogPage({ blog }: { blog?: any }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const contentRef = useRef<HTMLDivElement>(null);

//   const [title, setTitle] = useState(blog?.title || "");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [coverimage, setCoverimage] = useState(blog?.coverimage || "");

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     }
//   }, [status, router]);

//   // Apply formatting in contentEditable
//   const applyFormat = (command: string, value?: string) => {
//     contentRef.current?.focus();
//     document.execCommand(command, false, value);
//   };

//   // Normalize HTML before saving
//   const normalizeHTML = (html: string) => {
//     return html
//       .replace(/<div>/g, "<p>")       // Replace div with paragraph
//       .replace(/<\/div>/g, "</p>")
//       .replace(/<br>/g, "")           // Optional: remove lone <br>
//       .replace(/<strike>/g, "<del>")  // Use <del> for strikethrough
//       .replace(/<\/strike>/g, "</del>");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const contentHTML = normalizeHTML(contentRef.current?.innerHTML || "");

//       const res = await fetch(blog ? "/api/blog/update" : "/api/blog/create", {
//         method: blog ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id: blog?.id,
//           title,
//           content: contentHTML,
//           coverimage,
//         }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Something went wrong");
//       }

//       router.push("/");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto">
//       <div className="bg-card border border-border rounded-xl shadow-sm">
//         <div className="p-6 border-b border-border">
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//             {blog ? "Edit Blog" : "Write a Blog"}
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             {blog ? "Update your story" : "Share your thoughts with the world"}
//           </p>
//         </div>

//         <div className="p-6">
//           {error && (
//             <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
//               <p className="text-destructive text-sm">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Title Input */}
//             <div>
//               <h1 className="text-2xl font-bold mb-3">Title</h1>
//               <input
//                 type="text"
//                 placeholder="Enter blog title..."
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Cover Image Upload */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-foreground mb-1">
//                 Cover Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={async (e) => {
//                   const file = e.target.files?.[0];
//                   if (!file) return;

//                   try {
//                     const arrayBuffer = await file.arrayBuffer();
//                     const base64 = Buffer.from(arrayBuffer).toString("base64");
//                     const mimeType = file.type;
//                     const base64Data = `data:${mimeType};base64,${base64}`;
//                     setCoverimage(base64Data);

//                     toast.success("Cover image ready 🎉");
//                   } catch (err: any) {
//                     console.error(err);
//                     toast.error("Upload failed ❌");
//                   }
//                 }}
//                 className="mb-2 bg-gray-300 text-black rounded border-xl"
//               />
//               {coverimage && (
//                 <img
//                   src={coverimage || "/public/images/inkspire.png"}
//                   alt="Cover"
//                   className="w-full max-h-60 object-cover rounded-md mt-2"
//                 />
//               )}
//             </div>

            
//             {/* <div className="mb-3">
//               <label className="block text-sm font-medium text-foreground mb-2">
//                 Content
//               </label>
//               <div className="flex flex-wrap gap-2 mb-3 p-3 bg-muted/50 rounded-lg border border-border">
//                 <button
//                   type="button"
//                   onClick={() => applyFormat("bold")}
//                   className="px-3 py-2 bg-background border border-input rounded-md text-sm font-bold hover:bg-accent transition-colors"
//                 >
//                   B
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => applyFormat("italic")}
//                   className="px-3 py-2 bg-background border border-input rounded-md text-sm italic hover:bg-accent transition-colors"
//                 >
//                   I
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => applyFormat("strikeThrough")}
//                   className="px-3 py-2 bg-background border border-input rounded-md text-sm line-through hover:bg-accent transition-colors"
//                 >
//                   S
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => applyFormat("formatBlock", "H1")}
//                   className="px-3 py-2 bg-background border border-input rounded-md text-sm hover:bg-accent transition-colors"
//                 >
//                   H1
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => applyFormat("formatBlock", "H2")}
//                   className="px-3 py-2 bg-background border border-input rounded-md text-sm hover:bg-accent transition-colors"
//                 >
//                   H2
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => applyFormat("formatBlock", "H3")}
//                   className="px-3 py-2 bg-background border border-input rounded-md text-sm hover:bg-accent transition-colors"
//                 >
//                   H3
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => applyFormat("insertUnorderedList")}
//                   className="px-3 py-2 bg-background border border-input rounded-md text-sm hover:bg-accent transition-colors"
//                 >
//                   List
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => applyFormat("formatBlock", "BLOCKQUOTE")}
//                   className="px-3 py-2 bg-background border border-input rounded-md text-sm hover:bg-accent transition-colors"
//                 >
//                   Quote
//                 </button>
//               </div>
//             </div> */}

//             {/* WYSIWYG Content Box */}
//             <div
//               ref={contentRef}
//               id="content"
//               contentEditable
//               suppressContentEditableWarning
//               className="w-full min-h-[300px] px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground prose prose-invert"
//               dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
//             />

//             <div className="mt-2 text-xs text-muted-foreground">
//               {(contentRef.current?.innerText?.length ?? 0)} characters
//             </div>

//             {/* AI Writing Assistant */}
//             <AIWritingAssistant
//               content={contentRef.current?.innerHTML || ""}
//               title={title}
//               onSuggestionApply={(suggestion) => {
//                 if (contentRef.current) {
//                   contentRef.current.innerHTML += `<p>${suggestion}</p>`;
//                 }
//               }}
//             />

//             {/* AI Cover Image Generator */}
//             {title && (
//               <AICoverImageGenerator
//                 title={title}
//                 content={contentRef.current?.innerHTML || ""}
//                 onImageGenerated={(imageUrl) => setCoverimage(imageUrl)}
//               />
//             )}

//             {/* Social Media Snippets */}
//             {title && contentRef.current?.innerHTML && (
//               <SocialSnippets
//                 title={title}
//                 content={contentRef.current?.innerHTML || ""}
//                 authorName={session?.user?.name || "Author"}
//                 authorUsername={session?.user?.username || "author"}
//                 blogUrl={`https://inkspire.com/blog/${blog?.id || "new"}`}
//               />
//             )}

//             {/* Submit / Cancel */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 sm:flex-none sm:px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
//               </button>

//               <button
//                 type="button"
//                 className="flex-1 sm:flex-none sm:px-8 py-3 bg-muted text-muted-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
//                 onClick={() => router.back()}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import AIWritingAssistant from "@/components/AIWritingAssistant";
import SocialSnippets from "@/components/SocialSnippets";
import AICoverImageGenerator from "@/components/AICoverImageGenerator";
import toast from "react-hot-toast";

export default function CreateBlogPage({ blog }: { blog?: any }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const contentRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState(blog?.title || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coverimage, setCoverimage] = useState(blog?.coverimage || "");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const applyFormat = (command: string, value?: string) => {
    contentRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const normalizeHTML = (html: string) => {
    return html
      .replace(/<div>/g, "<p>")
      .replace(/<\/div>/g, "</p>")
      .replace(/<br>/g, "")
      .replace(/<strike>/g, "<del>")
      .replace(/<\/strike>/g, "</del>");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const contentHTML = normalizeHTML(contentRef.current?.innerHTML || "");

      const res = await fetch(blog ? "/api/blog/update" : "/api/blog/create", {
        method: blog ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blog?.id,
          title,
          content: contentHTML,
          coverimage,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {blog ? "Edit Blog" : "Write a Blog"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {blog ? "Update your story" : "Share your thoughts with the world"}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-lg font-semibold mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  const arrayBuffer = await file.arrayBuffer();
                  const base64 = Buffer.from(arrayBuffer).toString("base64");
                  const mimeType = file.type;
                  const base64Data = `data:${mimeType};base64,${base64}`;
                  setCoverimage(base64Data);
                  toast.success("Cover image ready 🎉");
                } catch (err: any) {
                  console.error(err);
                  toast.error("Upload failed ❌");
                }
              }}
              className="mb-3"
            />
            {coverimage && (
              <img
                src={coverimage || "/images/inkspire.png"}
                alt="Cover"
                className="w-full max-h-80 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-lg font-semibold mb-2">Content</label>
            <div
              ref={contentRef}
              contentEditable
              suppressContentEditableWarning
              className="w-full min-h-[300px] px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-input focus:outline-none focus:ring-2 focus:ring-ring prose prose-sm sm:prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            />
            <div className="mt-2 text-xs text-muted-foreground">
              {(contentRef.current?.innerText?.length ?? 0)} characters
            </div>
          </div>

          {/* AI Writing Assistant */}
          <AIWritingAssistant
            content={contentRef.current?.innerHTML || ""}
            title={title}
            onSuggestionApply={(suggestion) => {
              if (contentRef.current) {
                contentRef.current.innerHTML += `<p>${suggestion}</p>`;
              }
            }}
          />

          {/* AI Cover Image Generator */}
          {title && (
            <AICoverImageGenerator
              title={title}
              content={contentRef.current?.innerHTML || ""}
              onImageGenerated={(imageUrl) => setCoverimage(imageUrl)}
            />
          )}

          {/* Social Snippets */}
          {title && contentRef.current?.innerHTML && (
            <SocialSnippets
              title={title}
              content={contentRef.current?.innerHTML || ""}
              authorName={session?.user?.name || "Author"}
              authorUsername={session?.user?.username || "author"}
              blogUrl={`https://inkspire.com/blog/${blog?.id || "new"}`}
            />
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none sm:px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 sm:flex-none sm:px-8 py-3 bg-muted text-muted-foreground font-semibold rounded-lg hover:bg-accent transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
