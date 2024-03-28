import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { logIn } from "@/services/auth.service";

declare module "@auth/core/types" {
  interface User {
    accessToken: string;
    emailVerified: Date | null;
  }

  interface Session {
    user: {
      _id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
    emailVerified: Date | null;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  jwt: {
    maxAge: 3600,
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  providers: [
    Credentials({
      async authorize(credentials, req) {
        try {
          const res = await logIn({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });

          const user = {
            id: res.data._id,
            email: res.data.email,
            name: res.data.name,
            username: res.data.username,
            accessToken: res.data.token,
            emailVerified: res.data.emailVerified,
          };

          // console.log("hasura", user);

          return user;
        } catch (error) {
          return null;
        }
      },
      credentials: {
        email: { type: "email", label: "email" },
        password: { type: "password", label: "password" },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (!user || !user.accessToken) {
        return token; // Return token as is if user or accessToken is not defined
      }

      if (trigger === "update" && session) {
        return { ...token, ...session?.user };
      }

      return {
        ...token,
        accessToken: user.accessToken,
        emailVerified: user.emailVerified,
      };
    },
    async session({ session, token }) {
      session.user = {
        id: `next-auth-session-id-${token.sub}`,
        _id: `${token.sub}`,
        email: `${token.email}`,
        emailVerified: token.emailVerified,
        accessToken: token.accessToken,
      };

      // console.log("sestok", session);
      return session;
    },
  },
});
