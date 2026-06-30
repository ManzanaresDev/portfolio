// components/dashboard/UserBanner.tsx
import type { Session } from "next-auth";
import { SignOutButton } from "@/components/ui/sign-out-button";

export default function UserBanner({ session }: { session: Session }) {
  return (
    <div
      className="mb-10 flex items-center justify-between gap-3"
      style={{ marginTop: "2rem" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-cyan-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-300">
            Connecté en tant que{" "}
            <span className="font-semibold">{session.user?.name}</span>
          </p>
          <p className="text-sm text-gray-400">{session.user?.email}</p>
        </div>
      </div>

      <SignOutButton />
    </div>
  );
}
