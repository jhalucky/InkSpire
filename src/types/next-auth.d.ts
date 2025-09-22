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
      linkedinUrl?: string | null;
      githubUrl?: string | null;
      instagramUrl?: string | null;
    };
  }
}
