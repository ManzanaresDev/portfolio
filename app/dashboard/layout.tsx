// app/dashboard/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserBanner from "@/components/dashboard/UserBanner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <SessionProvider session={session}>
      <main className="min-h-screen px-6 py-16 text-white flex justify-center">
        <div className="w-full max-w-4xl">
          <UserBanner session={session} />
          <hr
            style={{ margin: "2rem 0", borderColor: "rgba(255,255,255,0.1)" }}
          />
          {children}
        </div>
      </main>
      <ToastContainer position="top-right" theme="dark" />
    </SessionProvider>
  );
}
