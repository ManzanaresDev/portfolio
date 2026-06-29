// components/sign-out-button.tsx
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button type="submit">Se déconnecter</button>
    </form>
  );
}
