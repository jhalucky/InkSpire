import { PrismaAdapter } from "@auth/prisma-adapter";
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
    signIn: "/signin", // Use our custom sign-in page
    newUser: "/profile/setup",
    error: "/api/auth/error", // Use a custom error page
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        // Fetch the full user object from the database with all fields
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
        
        // Extend the session with the custom user fields
        session.user = {
          ...session.user,
          ...fullUser,
        };
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Check if the user is signing in with an email that is already in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      // If the user doesn't exist, block the sign-in and redirect to the signup page
      if (!existingUser) {
        return `/signup?error=OAuthAccountNotLinked`;
      }
      return true;
    },
  },
};