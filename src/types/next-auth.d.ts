// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      username?: string | null;
      bio?: string | null;
      profession?: string | null;
      education?: string | null;
      twitterUrl?: string | null;
      instagramUrl?: string | null;
      linkedinUrl?: string | null;
      githubUrl?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    username?: string | null;
    bio?: string | null;
    profession?: string | null;
    education?: string | null;
    twitterUrl?: string | null;
    instagramUrl?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
  }
}
