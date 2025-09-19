import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string | null;
      bio?: string | null;
      profession?: string | null;
      education?: string | null;
      twitterUrl?: string | null;
    } & DefaultSession["user"];
  }
}
