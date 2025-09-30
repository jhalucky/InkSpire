"use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import ReadingModes from "@/components/ReadingModes";
// import { Heart, MessageSquare } from "lucide-react";

// type Blog = {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   author: { name: string | null; username: string | null; image: string | null };
//   comments: { id: string; content: string; author: { name: string | null; image: string | null } }[] | undefined;
//   likes: { id: string }[] | undefined;
// };

// export default function BlogPage() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBlog() {
//       try {
//         const res = await fetch(`/api/blogs/${id}`);
//         const data = await res.json();
//         setBlog(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (id) fetchBlog();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading blog...</p>;
//   if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

//   // Function to simulate reading time logic for display (based on word count/Prisma date)
//   const getMetadata = () => {
//     const minutes = Math.ceil(blog.content.length / 500); 
//     const date = new Date(blog.createdAt);
//     return {
//       readingTime: `~${minutes} min read`,
//       publishedAt: date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
//     };
//   };

//   const metadata = getMetadata();

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
//       {/* Author Info */}
//       <div className="flex items-center gap-4 mb-8">
//         {blog.author.image ? (
//           <Image
//             src={blog.author.image}
//             alt={blog.author.name || "Author"}
//             width={48}
//             height={48}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-bold">
//             {blog.author.name?.[0] || "U"}
//           </div>
//         )}
//         <div>
//           <h3 className="font-bold text-lg">{blog.author.name || "Unknown Author"}</h3>
//           <p className="text-sm text-gray-400">@{blog.author.username || "unknown"}</p>
//         </div>
//       </div>

//       {/* Post Title & Metadata */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-extrabold mb-3">{blog.title}</h1>
//         <div className="flex gap-4 text-sm text-gray-500">
//           <span>{metadata.readingTime}</span>
//           <span>•</span>
//           <span>Published on {metadata.publishedAt}</span>
//         </div>
//       </div>

//       {/* Reading Modes & Controls */}
//       <div className="mb-20 pb-4 border-t">
//         <ReadingModes
//           content={blog.content}
//           title={blog.title}
//           metadata={metadata}
//           onModeChange={(mode) => console.log("Mode changed to:", mode)}
//         />
//       </div>

      
//       <div className="flex gap-8 text-gray-400 text-base py-4 border-t border-b border-gray-700">
//         <span className="flex items-center gap-2 font-medium ml-5">
//           <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
//           {(blog.likes?.length ?? 0)} Likes
//         </span>
//         <span className="flex items-center gap-2 font-medium">
//           <MessageSquare className="w-5 h-5" />
//           {(blog.comments?.length ?? 0)} Comments
//         </span>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6">Comments ({blog.comments?.length ?? 0})</h2>
//         {!blog.comments || blog.comments.length === 0 ? (
//           <p className="text-gray-500">No comments yet. Be the first to start a discussion!</p>
//         ) : (
//           <ul className="space-y-6">
//             {blog.comments.map((comment) => (
//               <li key={comment.id} className="p-4 bg-gray-800 rounded-lg flex items-start gap-4">
//                 <Image
//                   src={comment.author?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//                   alt={comment.author?.name || "Anonymous"}
//                   width={40}
//                   height={40}
//                   className="w-10 h-10 rounded-full object-cover flex-shrink-0"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-200 mb-1">{comment.author?.name || "Anonymous"}</p>
//                   <p className="text-gray-300 text-base">{comment.content}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import ReadingModes from "@/components/ReadingModes";
// import { Heart, MessageSquare } from "lucide-react";

// type Blog = {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   author: { name: string | null; username: string | null; image: string | null };
//   comments: { id: string; content: string; author: { name: string | null; image: string | null } }[] | undefined;
//   likes: { id: string }[] | undefined;
// };

// // Normalize old HTML content for consistent display
// const normalizeHTML = (html: string) => {
//   if (!html) return "";
//   return html
//     .replace(/<div>/g, "<p>")
//     .replace(/<\/div>/g, "</p>")
//     .replace(/<br>/g, "")
//     .replace(/<strike>/g, "<del>")
//     .replace(/<\/strike>/g, "</del>");
// };

// export default function BlogPage() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBlog() {
//       try {
//         const res = await fetch(`/api/blogs/${id}`);
//         const data = await res.json();
//         setBlog(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (id) fetchBlog();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading blog...</p>;
//   if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

//   // Function to simulate reading time logic for display (based on word count)
//   const getMetadata = () => {
//     const minutes = Math.ceil(blog.content.length / 500);
//     const date = new Date(blog.createdAt);
//     return {
//       readingTime: `~${minutes} min read`,
//       publishedAt: date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
//     };
//   };

//   const metadata = getMetadata();

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
//       {/* Author Info */}
//       <div className="flex items-center gap-4 mb-8">
//         {blog.author.image ? (
//           <Image
//             src={blog.author.image}
//             alt={blog.author.name || "Author"}
//             width={48}
//             height={48}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-bold">
//             {blog.author.name?.[0] || "U"}
//           </div>
//         )}
//         <div>
//           <h3 className="font-bold text-lg">{blog.author.name || "Unknown Author"}</h3>
//           <p className="text-sm text-gray-400">@{blog.author.username || "unknown"}</p>
//         </div>
//       </div>

//       {/* Post Title & Metadata */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-extrabold mb-3">{blog.title}</h1>
//         <div className="flex gap-4 text-sm text-gray-500">
//           <span>{metadata.readingTime}</span>
//           <span>•</span>
//           <span>Published on {metadata.publishedAt}</span>
//         </div>
//       </div>

//       {/* Reading Modes & Controls */}
//       <div className="mb-20 pb-4 border-t">
//         <ReadingModes
//           content={blog.content}
//           title={blog.title}
//           metadata={metadata}
//           onModeChange={(mode) => console.log("Mode changed to:", mode)}
//         />
//       </div>

//       {/* Blog Content */}
//       <div
//         className="prose prose-invert max-w-none mb-12"
//         dangerouslySetInnerHTML={{ __html: normalizeHTML(blog.content) }}
//       />

//       {/* Likes and Comments */}
//       <div className="flex gap-8 text-gray-400 text-base py-4 border-t border-b border-gray-700">
//         <span className="flex items-center gap-2 font-medium ml-5">
//           <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
//           {(blog.likes?.length ?? 0)} Likes
//         </span>
//         <span className="flex items-center gap-2 font-medium">
//           <MessageSquare className="w-5 h-5" />
//           {(blog.comments?.length ?? 0)} Comments
//         </span>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6">Comments ({blog.comments?.length ?? 0})</h2>
//         {!blog.comments || blog.comments.length === 0 ? (
//           <p className="text-gray-500">No comments yet. Be the first to start a discussion!</p>
//         ) : (
//           <ul className="space-y-6">
//             {blog.comments.map((comment) => (
//               <li key={comment.id} className="p-4 bg-gray-800 rounded-lg flex items-start gap-4">
//                 <Image
//                   src={comment.author?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//                   alt={comment.author?.name || "Anonymous"}
//                   width={40}
//                   height={40}
//                   className="w-10 h-10 rounded-full object-cover flex-shrink-0"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-200 mb-1">{comment.author?.name || "Anonymous"}</p>
//                   <p className="text-gray-300 text-base">{comment.content}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import ReadingModes from "@/components/ReadingModes";
// import { Heart, MessageSquare } from "lucide-react";

// type Blog = {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   author: { name: string | null; username: string | null; image: string | null };
//   comments: { id: string; content: string; author: { name: string | null; image: string | null } }[] | undefined;
//   likes: { id: string }[] | undefined;
// };

// export default function BlogPage() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBlog() {
//       try {
//         const res = await fetch(`/api/blogs/${id}`);
//         const data = await res.json();
//         setBlog(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (id) fetchBlog();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading blog...</p>;
//   if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

//   const getMetadata = () => {
//     const minutes = Math.ceil(blog.content.replace(/<[^>]+>/g, "").length / 500); // remove HTML tags for word count
//     const date = new Date(blog.createdAt);
//     return {
//       readingTime: `~${minutes} min read`,
//       publishedAt: date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
//     };
//   };

//   const metadata = getMetadata();

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
//       {/* Author Info */}
//       <div className="flex items-center gap-4 mb-8">
//         {blog.author.image ? (
//           <Image
//             src={blog.author.image}
//             alt={blog.author.name || "Author"}
//             width={48}
//             height={48}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-bold">
//             {blog.author.name?.[0] || "U"}
//           </div>
//         )}
//         <div>
//           <h3 className="font-bold text-lg">{blog.author.name || "Unknown Author"}</h3>
//           <p className="text-sm text-gray-400">@{blog.author.username || "unknown"}</p>
//         </div>
//       </div>

//       {/* Post Title & Metadata */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-extrabold mb-3">{blog.title}</h1>
//         <div className="flex gap-4 text-sm text-gray-500">
//           <span>{metadata.readingTime}</span>
//           <span>•</span>
//           <span>Published on {metadata.publishedAt}</span>
//         </div>
//       </div>

//       {/* Reading Modes & Controls */}
//       <div className="mb-20 pb-4 border-t">
//         <ReadingModes
//           content={blog.content}
//           title={blog.title}
//           metadata={metadata}
//           onModeChange={(mode) => console.log("Mode changed to:", mode)}
//         />
//       </div>

//       {/* Blog Content */}
//       <div
//         className="prose prose-invert max-w-none mb-12 text-white"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       />

//       {/* Likes & Comments Summary */}
//       <div className="flex gap-8 text-gray-400 text-base py-4 border-t border-b border-gray-700">
//         <span className="flex items-center gap-2 font-medium ml-5">
//           <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
//           {(blog.likes?.length ?? 0)} Likes
//         </span>
//         <span className="flex items-center gap-2 font-medium">
//           <MessageSquare className="w-5 h-5" />
//           {(blog.comments?.length ?? 0)} Comments
//         </span>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6">Comments ({blog.comments?.length ?? 0})</h2>
//         {!blog.comments || blog.comments.length === 0 ? (
//           <p className="text-gray-500">No comments yet. Be the first to start a discussion!</p>
//         ) : (
//           <ul className="space-y-6">
//             {blog.comments.map((comment) => (
//               <li key={comment.id} className="p-4 bg-gray-800 rounded-lg flex items-start gap-4">
//                 <Image
//                   src={comment.author?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//                   alt={comment.author?.name || "Anonymous"}
//                   width={40}
//                   height={40}
//                   className="w-10 h-10 rounded-full object-cover flex-shrink-0"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-200 mb-1">{comment.author?.name || "Anonymous"}</p>
//                   <p className="text-gray-300 text-base">{comment.content}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center mb-12">
          ✍️ Create a New Blog
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Panel: Form */}
          <div className="space-y-8">
            {/* Cover Image */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400 mb-3">Cover Image</p>
              {coverImage ? (
                <div className="mb-4">
                  <Image
                    src={coverImage}
                    alt="Cover Preview"
                    width={600}
                    height={300}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
              ) : (
                <div className="mb-4 h-48 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                  No cover image selected
                </div>
              )}
              <div className="flex gap-3">
                <label
                  htmlFor="cover-upload"
                  className="px-4 py-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                >
                  Upload
                </label>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                  onClick={() => alert("AI Cover Generator Coming Soon!")}
                >
                  ✨ Generate with AI
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title..."
                className="w-full text-2xl font-bold bg-transparent border-b border-gray-700 focus:outline-none py-2"
              />
            </div>

            {/* Content */}
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog here..."
                rows={10}
                className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none"
              />
            </div>

            {/* AI Writing Assistant */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
              <h3 className="font-semibold mb-3">⚡ AI Writing Assistant</h3>
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500"
                onClick={() => alert("AI Writing Assistant Coming Soon!")}
              >
                Suggest Improvements
              </button>
            </div>

            {/* Social Snippets */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
              <h3 className="font-semibold mb-3">📢 Social Snippets</h3>
              <button
                type="button"
                className="px-4 py-2 bg-pink-600 rounded-lg text-white hover:bg-pink-500"
                onClick={() => alert("Social Snippets Generator Coming Soon!")}
              >
                Generate Snippets
              </button>
            </div>

            {/* Publish */}
            <button
              type="button"
              className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-lg text-lg font-bold"
              onClick={() => alert("Publishing functionality wired to API here")}
            >
              🚀 Publish Blog
            </button>
          </div>

          {/* Right Panel: Live Preview */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700">
            <h2 className="text-lg text-gray-400 mb-4">Live Preview</h2>
            {coverImage && (
              <Image
                src={coverImage}
                alt="Cover Preview"
                width={800}
                height={400}
                className="rounded-lg object-cover w-full mb-6"
              />
            )}
            <div className="prose prose-invert max-w-none">
              <h1>{title || "Your Title Here"}</h1>
              <p>
                {content
                  ? content
                  : "Start writing your blog content and see the live preview here."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
