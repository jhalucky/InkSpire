// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user?: {
            id: string;
            username?: string | null;
            bio?: string | null;
            twitterUrl?: string | null;
            profession?: string | null;
            education?: string | null;
            avatar?: string | null; // <--- Add this line
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        username?: string | null;
        bio?: string | null;
        twitterUrl?: string | null;
        profession?: string | null;
        education?: string | null;
        avatar?: string | null; // <--- Add this line
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        username?: string | null;
        bio?: string | null;
        twitterUrl?: string | null;
        profession?: string | null;
        education?: string | null;
        avatar?: string | null; // <--- Add this line
    }
}