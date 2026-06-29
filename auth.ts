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
  // pages personnalisées (optionnel)
  pages: {
    signIn: "/login",
  },
  // Callbacks (optionnel) - pour enrichir la session
  // session({ session, token }) {
  //   if (token.sub && session.user) {
  //     session.user.id = token.sub;
  //   }
  //   return session;
  // },
  // Contrôler qu_i peut se connecter (optionnel)
  // async signIn({ user }) {
  // Exemple: autoriser uniquement certains domains e-mail
  // if (!user.email?.endsWith("@votreentreprise.fr")) returns false
  //   return true;
  // },
});
