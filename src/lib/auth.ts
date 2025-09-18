// auth.ts

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
    async jwt({ token, user }) { // `session` is not typically needed here
      // The `user` object is only available on the first sign-in,
      // or if the session is refreshed from the database (e.g., on `update()`).
      // When `user` is available, it means it's coming from the database/adapter.
      if (user) {
        token.id = user.id;
        // Cast `user` to `any` or extend `AdapterUser` if you prefer stricter typing
        token.username = (user as any).username; 
        token.bio = (user as any).bio;
        token.twitterUrl = (user as any).twitterUrl; // <-- Ensure this is correctly added here
        token.profession = (user as any).profession;
        token.education = (user as any).education;
      }
      return token;
    },
    // *** CRITICAL CHANGE HERE ***
    async session({ session, token }) { // Use `token` to populate custom fields
      if (token && session.user) { // Check if both token and session.user exist
        session.user.id = token.id as string;
        session.user.username = token.username as string | null | undefined;
        session.user.bio = token.bio as string | null | undefined;
        session.user.twitterUrl = token.twitterUrl as string | null | undefined; // <-- Get from token
        session.user.profession = token.profession as string | null | undefined;
        session.user.education = token.education as string | null | undefined;
        // The default fields like name, email, image are usually already on session.user
        // If 'avatar' in your schema is mapped to 'image' for provider, no need for separate 'avatar' field in session.user
        // If it's a separate field, ensure it's handled in `jwt` callback from `user` object.
        // For now, let's assume `avatar` is just `image`.
      } else if (token && !session.user) {
         console.warn("NextAuth: session.user was unexpectedly undefined in session callback but token existed.");
         // This situation indicates a deeper issue, but we'll try to provide a basic user object.
         // This block might still be hit if a new user is signing in and session.user is bare.
         // However, the `DefaultSession["user"]` type should usually ensure `session.user` exists.
         // Let's ensure the default properties are taken from the token if needed.
         session.user = { 
            id: token.id as string,
            name: token.name,
            email: token.email,
            image: token.picture, // or token.image
            username: token.username as string | null | undefined,
            bio: token.bio as string | null | undefined,
            twitterUrl: token.twitterUrl as string | null | undefined,
            profession: token.profession as string | null | undefined,
            education: token.education as string | null | undefined,
         }
      }
      return session;
    },
    // ... rest of your callbacks (signIn, events) remain the same
    async signIn({ user, account }) {
      if (!account) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name!,
            email: user.email!,
            avatar: user.image || null, 
          },
        });
        return true; 
      }

      const existingAccount = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
      });

      if (!existingAccount) {
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
            access_token: account.access_token,
            id_token: account.id_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          },
        });
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        return "/profile/setup";
      }
    },
  },
};