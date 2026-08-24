// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

if (
  !process.env.AUTH_GOOGLE_ID ||
  !process.env.AUTH_GOOGLE_SECRET ||
  !process.env.AUTH_SECRET
) {
  throw new Error("GOOGLE AUTH CONFIGURATION is not defined");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
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
    const allowedEmails = [
      "marcos.manzanares.perso@gmail.com",
      "marcosmanzanaresdev@gmail.com",
    ];
    return !!auth?.user && allowedEmails.includes(auth.user.email ?? "");
  },
},
});
