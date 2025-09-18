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
      // On initial sign-in, the `user` object is populated by the adapter.
      // We use it to populate the JWT with our custom fields.
      if (user) {
        // The `user` object from the adapter has all the database fields,
        // including your custom ones.
        return {
          ...token,
          id: user.id,
          username: (user as any).username,
          bio: (user as any).bio,
          twitterUrl: (user as any).twitterUrl,
          profession: (user as any).profession,
          education: (user as any).education,
          // Use the `image` field, as it's the standard NextAuth property
          image: (user as any).image,
        };
      }

      // On subsequent requests, the `user` object is undefined.
      // We retrieve the latest user data from the database using the token's ID
      // to ensure the session is always up to date.
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
            avatar: dbUser.avatar,
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
        session.user.avatar = token.avatar as string | null | undefined;
      }
      return session;
    },
    async signIn({ isNewUser }) {
      if (isNewUser) {
        return "/profile/setup";
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
};