// app/dashboard/page.tsx
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ADMIN_CARDS = [
  {
    href: "/dashboard/testimonials",
    title: "Témoignages",
    description: "Modérer les avis en attente de validation.",
    icon: "💬",
  },
  {
    href: "/dashboard/projects",
    title: "Projets",
    description: "Créer, éditer et supprimer les projets du portfolio.",
    icon: "🗂️",
  },
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <main className="min-h-screen px-6 py-16 text-white flex justify-center">
      <div className="w-full max-w-4xl">
        <div
          className="mb-10 flex items-center gap-3 ml-auto"
          style={{ marginTop: "2rem" }}
        >
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
        <hr
          style={{ margin: "2rem 0", borderColor: "rgba(255,255,255,0.1)" }}
        />

        <h1
          style={{ marginTop: "2rem" }}
          className="mb-2 text-3xl font-bold text-cyan-400"
        >
          Administration
        </h1>

        <p className="mb-12 text-sm text-slate-400">Gestion du portfolio</p>

        <div className="grid gap-6 sm:grid-cols-2">
          {ADMIN_CARDS.map((card) => (
            <Link key={card.href} href={card.href}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:-translate-y-1">
                <div className="mb-4 text-4xl">{card.icon}</div>
                <h2 className="mb-2 text-xl font-bold">{card.title}</h2>
                <p className="text-sm leading-6 text-slate-400">
                  {card.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
