"use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import TippingSystem from "@/components/TippingSystem";
// import { toast } from "sonner";

// export default function TippingPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const authorId = searchParams.get("authorId");

//   const [authorUpiId, setAuthorUpiId] = useState<string | null>(null);

//   useEffect(() => {
//     if (!authorId) return;

//     // Fetch only the UPI ID from backend
//     fetch(`/api/user/${authorId}`, { cache: "no-store" })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched data:", data);
//         if (data?.upiId) {
//           setAuthorUpiId(data.upiId);
//         } else {
//           toast.error("Author UPI ID is missing ❌"); // ✅ show toast instead of console.error
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching author UPI:", err);
//         toast.error("Failed to fetch author details ❌"); // optional: handle fetch errors
//       });
//   }, [authorId]);

//   if (!authorId) {
//     return (
//       <p className="text-red-500 text-center mt-10">
//         Author ID missing. Cannot tip.
//       </p>
//     );
//   }

//   if (!authorUpiId) {
//     return <p className="text-center mt-10">Loading author details...</p>;
//   }

//   return (
//     <TippingSystem
//       authorId={authorId}
//       authorUpiId={authorUpiId}
//       onClose={() => router.push("/blogs")}
//     />
//   );
// }



// src/app/tipping/page.tsx (client)
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
            /* ignore parse error */
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

  // Make sure the Toaster is present so toast messages appear.
  // If you've already added <Toaster /> in root layout, leaving it here won't hurt.
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
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Back to blogs
            </button>
            <button
              onClick={() => {
                // simple retry: reload the page (keeps query param)
                window.location.reload();
              }}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  // If we have a UPI, render the tipping UI
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
