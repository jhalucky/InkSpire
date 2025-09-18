// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: {
            id: string;
            username?: string | null;
            bio?: string | null;
            twitterUrl?: string | null;
            profession?: string | null;
            education?: string | null;
        } & DefaultSession["user"];
    }

    /**
     * The `user` type on the `user` object in the `signIn` callback and `jwt` callback.
     */
    interface User extends DefaultUser {
        username?: string | null;
        bio?: string | null;
        twitterUrl?: string | null;
        profession?: string | null;
        education?: string | null;
    }
}

declare module "next-auth/jwt" {
    /**
     * The `JWT` type on the `jwt` object in the `jwt` callback.
     */
    interface JWT extends DefaultJWT {
        username?: string | null;
        bio?: string | null;
        twitterUrl?: string | null;
        profession?: string | null;
        education?: string | null;
    }
}