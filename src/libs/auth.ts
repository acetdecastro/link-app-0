import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { logIn } from "@/services/auth.service";
import { Axios, AxiosError } from "axios";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    maxAge: 3600,
  },
  session: {
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
            token: res.data.token,
          };

          return res.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            // console.log(error?.response?.data?.message);
            return null;
          }
          return null;
        }
      },
      credentials: {
        email: { type: "email", label: "email" },
        password: { type: "password", label: "password" },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // User represents response from OAuth providers
    async jwt({ token, user, trigger }) {
      // console.log("tokenjwt", token);
      // console.log("userjwt", user);
      if (trigger === "signIn") {
        // console.log(token);
        // token.
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session", session);
      // console.log("sessionuser", user);
      // console.log("sessiontoken", token);
      return session;
    },
  },
});
