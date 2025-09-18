// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; 
      username?: string | null; 
      bio?: string | null; 
      twitterUrl?: string | null;
      profession?: string | null;
      education?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string | null;
    bio?: string | null;
    twitterUrl?: string | null;
    profession?: string | null;
    education?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username?: string | null;
    bio?: string | null;
    twitterUrl?: string | null;
    profession?: string | null;
    education?: string | null;
  }
}