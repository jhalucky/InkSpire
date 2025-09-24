// TippingPage.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import TippingSystem from "@/components/TippingSystem";
import { useEffect, useState } from "react";

export default function TippingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [authorId, setAuthorId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorImage, setAuthorImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      router.push("/blogs"); 
      return;
    }

    const fetchAuthor = async () => {
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();

        setAuthorId(data.authorId);
        setAuthorName(data.author?.name || "Unknown Author");
        setAuthorImage(data.author?.image || undefined);
      } catch (err) {
        console.error(err);
        router.push("/blogs"); 
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [searchParams, router]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // Render only the TippingSystem
  return (
    <TippingSystem
      authorId={authorId}
      authorName={authorName}
      authorImage={authorImage}
      onTip={(amount: number, message: string) => {
        console.log(`Tipped $${amount} to ${authorName}: ${message}`);
        router.push("/blogs"); // redirect after tipping
      }}
      onClose={() => router.push("/blogs")} // Close modal
    />
  );
}
