"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TippingSystem from "@/components/TippingSystem";
import toast, { Toaster } from "react-hot-toast";

export default function TippingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const authorId = searchParams.get("authorId");

  const [authorUpiId, setAuthorUpiId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authorId) {
      const msg = "Author ID missing. Cannot tip.";
      setError(msg);
      setLoading(false);
      toast.error(msg);
      return;
    }

    const ctrl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/user/${authorId}`, {
          cache: "no-store",
          signal: ctrl.signal,
        });

        if (!res.ok) {
          // Try to parse a JSON error, fallback to generic
          let msg = "Failed to fetch author details";
          try {
            const json = await res.json();
            if (json?.error) msg = json.error;
          } catch {
            
          }
          setError(msg);
          toast.error(msg);
          return;
        }

        const data = await res.json();
        if (data?.upiId) {
          setAuthorUpiId(data.upiId);
        } else {
          const msg = "Author UPI ID is missing";
          setError(msg);
          toast.error(msg);
        }
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        const msg = "Failed to fetch author details";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [authorId]);


  if (loading) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Loading author details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error && !authorUpiId) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 p-4">
          <p className="text-red-500 font-medium text-center">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/blogs")}
              className="px-4 py-2 rounded bg-white text-black hover:bg-gray-300"
            >
              Back to blogs
            </button>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="px-4 py-2 rounded bg-black text-white hover:bg-gray-300"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <TippingSystem
        authorId={authorId!}
        authorUpiId={authorUpiId!}
        onClose={() => router.push("/blogs")}
      />
    </>
  );
}
