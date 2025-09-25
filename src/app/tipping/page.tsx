"use client";

import { useRouter } from "next/navigation";
import TippingSystem from "@/components/TippingSystem";
import { useSession } from "next-auth/react";

interface TippingPageProps {
  authorId: string;
  authorName: string;
  authorImage?: string;
  authorUpiId?: string | null;
  onTip: (amount: number, message: string) => void;
  onClose?: () => void;
}

export default function TippingPage({
  authorId,
  authorName,
  authorImage,
  authorUpiId,
  onTip,
  onClose,
}: TippingPageProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleTip = async (amount: number, message: string) => {
    try {
      // If you want to submit via API
      if (!authorId) throw new Error("Author ID missing");

      const res = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId: authorId,
          fromUserId: session?.user?.id || null,
          amount,
          message,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit tip");

      const data = await res.json();
      console.log("Tip submitted successfully:", data);

      // Call external onTip handler if provided
      if (onTip) onTip(amount, message);

      // Close modal or navigate away
      if (onClose) onClose();
    } catch (err) {
      console.error("Tip submission error:", err);
    }
  };

  return (
    <TippingSystem
      authorId={authorId}
      authorName={authorName}
      authorImage={authorImage}
      authorUpiId={authorUpiId}
      onTip={handleTip}
      onClose={onClose || (() => router.push("/blogs"))}
    />
  );
}
