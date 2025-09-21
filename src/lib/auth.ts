import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";
import { Session } from "next-auth";

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
          },
        });
        
        session.user = {
          ...session.user,
          ...fullUser,
        };
      }
      return session;
    },
    // The custom signIn callback is removed to allow NextAuth.js
    // to handle new user creation automatically with the Prisma adapter.
  },
};
