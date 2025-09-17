import { Account, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    GitHubProvider({ clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! }),
  ],
  
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      // Guard clauses for safety
      if (!user.email) return false;
      if (!account) return true;

      // Check if a user already exists with this email
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        // Check if this provider/account is already linked
        const existingAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        // Link account if not already linked
        if (!existingAccount) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token ?? undefined,
              id_token: account.id_token ?? undefined,
              refresh_token: account.refresh_token ?? undefined,
              expires_at: account.expires_at ?? undefined,
            },
          });
        }
      }

      return true;
    },

    // Optional: attach user info to session
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },
  },
};
