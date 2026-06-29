// proxy.ts
export { auth as proxy } from "@/auth";

// Configurer les routes à protéger
export const config = {
  matcher: [
    // Protéger toutes les routes sauf:
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
