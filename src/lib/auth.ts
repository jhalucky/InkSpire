import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

export const authOptions: AuthOptions = {
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
  pages: {
    signIn: "/signin",
    newUser: "/profile/setup",
    error: "/api/auth/error",
  },
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
  },
};
