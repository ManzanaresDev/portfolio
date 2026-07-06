// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_SECRET) {
  throw new Error("GOOGLE AUTH CONFIGURATION is not defined");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      // true = accès autorisé, false = redirection vers /login
      return !!auth?.user;
    },
  },
});
