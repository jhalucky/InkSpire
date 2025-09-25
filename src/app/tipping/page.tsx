"use client";

import { useSearchParams, useRouter } from "next/navigation";
import TippingSystem from "@/components/TippingSystem";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function TippingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [authorId, setAuthorId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorImage, setAuthorImage] = useState<string | undefined>(undefined);
  const [authorUpiId, setAuthorUpiId] = useState<string | null>(null);
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
        
        setAuthorId(data.author.id);
        setAuthorName(data.author?.name || "Unknown Author");
        setAuthorImage(data.author?.image || undefined);
        setAuthorUpiId(data.author?.upiId || null); // Fetch and set UPI ID
      } catch (err) {
        console.error(err);
        router.push("/blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const handleTip = async (amount: number, message: string) => {
    try {
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toUserId: authorId,
          fromUserId: session?.user?.id,
          amount,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to post tip.");
      }

      const data = await res.json();
      console.log("Tip submitted successfully:", data);
      router.push("/blogs");
    } catch (err) {
      console.error("Tip submission error:", err);
      // You can display an error message to the user here
    }
  };

  return (
    <TippingSystem
      authorId={authorId}
      authorName={authorName}
      authorImage={authorImage}
      authorUpiId={authorUpiId}
      onTip={handleTip}
      onClose={() => router.push("/blogs")}
    />
  );
}