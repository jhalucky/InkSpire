"use client";

import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function LandingPage() {
  const router = useRouter();

  const features: never[] = [];

  return (
    <div className="min-h-screen relative">
      <Hero />

      {/* Section: Highlights */}
      <About />

      {/* Section: Get started */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="h2-title text-2xl sm:text-3xl text-white mb-4">Start in minutes</h2>
          <p className="muted mb-8">Create an account, write your first post, and share it with the world.</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => router.push('/signup')} className="btn-white">Create Account</button>
            <button onClick={() => router.push('/blogs')} className="btn-outline">Browse Posts</button>
          </div>
        </div>
      </section>

      {/* Social Links (hidden per request for simplicity)
      <div className="border-t border-border bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Built with love by Lucky Jha</span>
            </div>
            
            <div className="flex gap-4">
              <a
                href="https://github.com/jhalucky"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://x.com/theluckyjha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com/jhalucky"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com/in/jhalucky"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>
       </div> */}
    </div>
  );
}