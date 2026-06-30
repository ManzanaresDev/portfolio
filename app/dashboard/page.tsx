// app/dashboard/page.tsx
import Link from "next/link";

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

export default function DashboardPage() {
  return (
    <>
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
    </>
  );
}
