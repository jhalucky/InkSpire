"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="h1-display text-6xl sm:text-7xl lg:text-8xl text-white mb-8">InkSpire</h1>
        <p className="text-base sm:text-lg muted mb-10">
          Share your stories, inspire the world, and connect with fellow writers.
        </p>
        <button
          onClick={() => router.push('/blogs')}
          className="btn-white inline-flex items-center justify-center"
        >
          Enter the World of Blogging
        </button>
      </div>
    </section>
  );
}


