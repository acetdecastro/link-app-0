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
    error: "/error",
  },
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
            name: res.data.name,
            username: res.data.username,
            token: res.data.token,
          };

          return res.data;
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
    async jwt({ token, user, trigger }) {
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
});
