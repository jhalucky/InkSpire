import { Account, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google & GitHub providers
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (!account) return true; // just in case

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
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
      }

      return true;
    },
  },
};
