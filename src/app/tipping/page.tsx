"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TippingSystem from "@/components/TippingSystem";
import { toast } from "sonner";

export default function TippingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const authorId = searchParams.get("authorId");

  const [authorUpiId, setAuthorUpiId] = useState<string | null>(null);

  useEffect(() => {
    if (!authorId) return;

    // Fetch only the UPI ID from backend
    fetch(`/api/user/${authorId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data?.upiId) {
          setAuthorUpiId(data.upiId);
        } else {
          toast.error("Author UPI ID is missing ❌"); // ✅ show toast instead of console.error
        }
      })
      .catch((err) => {
        console.error("Error fetching author UPI:", err);
        toast.error("Failed to fetch author details ❌"); // optional: handle fetch errors
      });
  }, [authorId]);

  if (!authorId) {
    return (
      <p className="text-red-500 text-center mt-10">
        Author ID missing. Cannot tip.
      </p>
    );
  }

  if (!authorUpiId) {
    return <p className="text-center mt-10">Loading author details...</p>;
  }

  return (
    <TippingSystem
      authorId={authorId}
      authorUpiId={authorUpiId}
      onClose={() => router.push("/blogs")}
    />
  );
}
