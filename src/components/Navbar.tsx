"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, PenTool, User, LogIn, Settings, BookOpen, Users, TrendingUp } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleWriteBlog = () => {
    if (!session) {
      router.push("/signin");
    } else {
      router.push("/blog/create");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 glass backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <PenTool className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">InkSpire</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/blogs" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              Discover
            </Link>
            <Link 
              href="/communities" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Users className="h-4 w-4" />
              Communities
            </Link>
            <Link 
              href="/trending" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Link>
            <Link 
              href="/features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <PenTool className="h-4 w-4" />
              Features
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleWriteBlog}
              className="inline-flex items-center justify-center rounded-xl bg-white text-black px-6 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors gap-2"
            >
              <PenTool className="h-4 w-4" />
              <span>Write</span>
            </button>

            {session ? (
              <div className="flex items-center space-x-3">
                <Link href="/profile" className="flex items-center space-x-2">
                  {session.user?.image ? (
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-border">
                      <Image
                        src={session.user.image}
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground hidden lg:block">
                    {session.user?.name || "Profile"}
                  </span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/signin">
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/blogs"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Discover
                </div>
              </Link>
              <Link
                href="/communities"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Communities
                </div>
              </Link>
              <Link
                href="/trending"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </div>
              </Link>
              <Link
                href="/features"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Features
                </div>
              </Link>
              
              <div className="border-t border-border pt-2 mt-2">
                <button
                  onClick={handleWriteBlog}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors"
                >
                  <PenTool className="h-4 w-4" />
                  Write a Blog
                </button>
              </div>

              {session ? (
                <div className="border-t border-border pt-2 mt-2 space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {session.user?.image ? (
                      <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-border">
                        <Image
                          src={session.user.image}
                          alt="User Avatar"
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <span>{session.user?.name || "Profile"}</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-border pt-2 mt-2">
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
