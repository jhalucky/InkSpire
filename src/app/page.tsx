"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen items-center text-white">
      {/* Hero Section */}
      <div className="flex flex-col flex-1 items-center justify-center text-center p-6">
        <h1 className="text-8xl sm:text-9xl tracking-widest mb-6 font-sans">
          InkSpire
        </h1>
        <p className="text-gray-400 text-xl sm:text-lg mb-12 max-w-xl font-sans">
          Share your stories, inspire the world, and connect with fellow writers.
        </p>
        <button
          onClick={() => router.push("/blogs")}
          className="bg-white text-black font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Enter the World of Blogging
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-400 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4">
          {/* GitHub Icon */}
          <a
            href="https://github.com/jhalucky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub size={24} />
          </a>

          {/* X (Twitter) Icon */}
          <a
            href="https://x.com/theluckyjha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTwitter size={24} />
          </a>

          {/* Instagram Icon */}
          <a
            href="https://instagram.com/jhalucky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaInstagram size={24} />
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://linkedin.com/in/jhalucky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
        <p>Built with ❤️ by Lucky Jha</p>
      </footer>
    </div>
  );
}