"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-black text-white scroll-smooth">
      
      {/* Hero Section */}
      <section className="w-full h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 lg:px-20 text-center"
        >
          <Hero />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("/blogs")}
              className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Browse Blogs
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="w-full h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 lg:px-20 text-center"
        >
          <About />
        </motion.div>
      </section>
    </div>
  );
}
