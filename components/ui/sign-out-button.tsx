// components/sign-out-button.tsx
import { signOut } from "@/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-colors duration-200 hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-400"
      >
        Se déconnecter
      </button>
    </form>
  );
}
