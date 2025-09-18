// src/lib/auth.ts

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Get full user data from the database on initial sign-in
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (dbUser) {
          return {
            ...token,
            id: dbUser.id,
            username: dbUser.username,
            bio: dbUser.bio,
            twitterUrl: dbUser.twitterUrl,
            profession: dbUser.profession,
            education: dbUser.education,
            image: dbUser.avatar, // Use 'avatar' field from Prisma
          };
        }
      }

      // On subsequent requests, token.id is available
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
        });

        if (dbUser) {
          return {
            ...token,
            username: dbUser.username,
            bio: dbUser.bio,
            twitterUrl: dbUser.twitterUrl,
            profession: dbUser.profession,
            education: dbUser.education,
            image: dbUser.avatar, // Use 'avatar' field from Prisma
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string | null | undefined;
        session.user.bio = token.bio as string | null | undefined;
        session.user.twitterUrl = token.twitterUrl as string | null | undefined;
        session.user.profession = token.profession as string | null | undefined;
        session.user.education = token.education as string | null | undefined;
        session.user.image = token.image as string | null | undefined;
      }
      return session;
    },
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { username: true }
      });

      if (!dbUser || !dbUser.username) {
        // Correctly return the URL to redirect the new user
        return "/profile/setup";
      }

      return true;
    }
  },
  pages: {
    signIn: "/signin",
  },
};