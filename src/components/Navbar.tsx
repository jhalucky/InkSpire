"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, PenTool, User, LogIn, BookOpen, Users, TrendingUp } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleWriteBlog = () => {
    if (!session) router.push("/signin");
    else router.push("/blog/create");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 glass backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 justify-between">
        <div className="flex h-18 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <PenTool className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text hidden sm:block">InkSpire</span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-12">
            <Link href="/blogs" className="flex items-center gap-2 text-sm font-medium hover:text-blue-400">
              <BookOpen className="h-5 w-5" /> Discover
            </Link>
            <Link href="/communities" className="flex items-center gap-2 text-sm font-medium hover:text-indigo-400">
              <Users className="h-5 w-5" /> Communities
            </Link>
            <Link href="/trending" className="flex items-center gap-2 text-sm font-medium hover:text-indigo-400">
              <TrendingUp className="h-5 w-5" /> Trending
            </Link>
            <Link href="/features" className="flex items-center gap-2 text-sm font-medium hover:text-indigo-400">
              <PenTool className="h-5 w-5" /> Features
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              onClick={handleWriteBlog}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-colors gap-3"
            >
              <PenTool className="h-5 w-5" /> Write
            </button>

            {session ? (
              <>
                <Link href="/profile" className="flex items-center space-x-3">
                  {session.user?.image ? (
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-border">
                      <Image src={session.user.image} alt="User Avatar" width={40} height={40} className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-muted-foreground hover:text-indigo-400 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/signin">
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors gap-2">
                  <LogIn className="h-5 w-5" /> Sign In
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background py-4">
            <div className="px-4 space-y-3">
              {[
                { href: "/blogs", icon: <BookOpen className="h-5 w-5" />, label: "Discover" },
                { href: "/communities", icon: <Users className="h-5 w-5" />, label: "Communities" },
                { href: "/trending", icon: <TrendingUp className="h-5 w-5" />, label: "Trending" },
                { href: "/features", icon: <PenTool className="h-5 w-5" />, label: "Features" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">{item.icon}{item.label}</div>
                </Link>
              ))}

              <button
                onClick={handleWriteBlog}
                className="w-full flex items-center justify-center gap-2 px-3 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
              >
                <PenTool className="h-5 w-5" /> Write a Blog
              </button>

              {session ? (
                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {session.user?.image ? (
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-border">
                        <Image src={session.user.image} alt="User Avatar" width={40} height={40} className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <span>{session.user?.name || "Profile"}</span>
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: "/" }); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-border pt-3 mt-3">
                  <Link
                    href="/signin"
                    className="block w-full text-center px-3 py-2 text-base font-medium text-foreground border border-input hover:bg-accent rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}