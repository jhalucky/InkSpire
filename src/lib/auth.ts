// src/lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

// Define a type-safe user for session
type SafeUser = {
  id: string;
  name: string;           // Never null
  email: string;
  image: string;          // Never null
  username: string;
  bio: string;
  profession: string;
  education: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
};

// Default fallback values
const DEFAULT_USER: SafeUser = {
  id: "",
  name: "User",
  email: "",
  image: "https://placehold.co/112x112/FFFFFF/212121?text=N/A",
  username: "Not Set",
  bio: "Not Set",
  profession: "Not Set",
  education: "Not Set",
  twitterUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
  githubUrl: "",
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/profile/setup",
    error: "/api/auth/error",
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        const fullUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            username: true,
            bio: true,
            profession: true,
            education: true,
            twitterUrl: true,
            instagramUrl: true,
            linkedinUrl: true,
            githubUrl: true,
          },
        });

        // Merge with safe defaults
        session.user = {
          ...DEFAULT_USER,
          ...fullUser,
        } as SafeUser;
      }

      return session;
    },
  },
};