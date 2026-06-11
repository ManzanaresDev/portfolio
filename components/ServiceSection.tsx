// components/ServiceSection.tsx
// CSS inline uniquement — aucune dépendance à Tailwind

import { Check, ShieldCheck, Lock } from "lucide-react";
import React from "react";

const services = [
  {
    num: "01",
    title: "Création de sites",
    price: "800 – 2 500 € / site",
    description:
      "Vitrine & portfolio — présenter votre activité et valoriser votre savoir-faire.",
    description2:
      "Portail client, prise de rendez-vous, formulaire métier, interface de gestion interne — livrés avec les clés.",
  },
  {
    num: "02",
    title: "Audits sécurité",
    price: "150 – 500 € / audit",
    description:
      "Rapport lisible, actions classées par risque, conformité RGPD vérifiée.",
  },
  {
    num: "03",
    title: "Maintenance",
    price: "29 – 99 €/mois",
    description:
      "Surveillance 24/7, mises à jour, sauvegardes — revenu stable et prévisible.",
    note: "8 – 10 contrats récurrents",
  },
];

const auditItems = [
  "Vérification des injections SQL et XSS",
  "Détection des accès non protégés",
  "Exposition des mots de passe",
  "Contrôle de la conformité RGPD",
  "Analyse des en-têtes de sécurité",
  "Rapport clair, sans jargon technique",
  "Actions prioritaires classées par risque",
  "Durée : 1 à 2 jours",
];

const rgpdCols = [
  {
    title: "Architecture",
    items: [
      "Chiffrement bout en bout",
      "Hachage des mots de passe",
      "Suppression de compte native",
      "Contrôle d'accès granulaire",
    ],
  },
  {
    title: "Droits utilisateurs",
    items: [
      "Accès & export des données",
      "Droit à l'oubli automatisé",
      "Consentement granulaire",
      "Registre des traitements auto",
    ],
  },
  {
    title: "Avantage business",
    items: [
      "Confiance accélérée B2B",
      "Marchés réglementés ouverts",
      "0 mise en conformité client",
      "Différenciation durable",
    ],
  },
];

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 16,
  padding: "clamp(14px, 2.5vw, 24px)",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

function CheckItem({ text }: { text: string }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        fontSize: "clamp(12px, 1.3vw, 14px)",
        color: "rgba(255,255,255,0.55)",
        listStyle: "none",
        margin: "4px 0",
      }}
    >
      <Check
        size={14}
        style={{ marginTop: 2, flexShrink: 0, color: "#34d399" }}
      />
      {text}
    </li>
  );
}

export default function ServicesSection() {
  return (
    <section
      style={{
        padding: "clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)",
        maxWidth: 960,
        margin: "0 auto",
        color: "#fff",
      }}
    >
      {/* Hero */}
      <div style={{ marginBottom: "clamp(32px, 6vw, 56px)" }}>
        <h2
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            fontWeight: 700,
            margin: "0 0 12px",
            color: "#5ddfff",
            letterSpacing: "0.01em",
          }}
        >
          Conception des sites et applications web
        </h2>
        <p
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: 0,
          }}
        >
          <span
            style={{
              fontSize: "clamp(1rem, 1.5vw, 2rem)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            J
          </span>
          e propose aux petites structures des sites web rapides et performants
          intégrant dès le départ les bonnes pratiques de cybersécurité<br></br>
          <br></br> Donnez vie à vos projets avec des sites web et applications
          rapides, performants et sécurisés. De l&#39;idée initiale jusqu&#39;au
          déploiement, tout est géré pour vous : conception, développement,
          optimisation et mise en ligne. Une solution clé en main pensée pour
          attirer, convaincre et faire grandir votre activité.
        </p>
      </div>

      {/* Label services */}
      <p
        style={{
          fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          margin: "0 0 16px",
        }}
      >
        Services et tarifs
      </p>

      {/* Service cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "clamp(10px, 2vw, 16px)",
          marginBottom: "clamp(28px, 5vw, 48px)",
        }}
      >
        {services.map((s) => (
          <div key={s.num} style={card}>
            <span
              style={{
                fontSize: "clamp(22px, 4vw, 32px)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.15)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {s.num}
            </span>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 16px)",
                fontWeight: 500,
                margin: 0,
                color: "#fff",
              }}
            >
              {s.title}
            </p>
            <p
              style={{
                fontSize: "clamp(16px, 2.5vw, 22px)",
                fontWeight: 600,
                color: "#93c5fd",
                margin: "2px 0",
              }}
            >
              {s.price}
            </p>
            <p
              style={{
                fontSize: "clamp(12px, 1.3vw, 13px)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {s.description}
            </p>
            {"description2" in s && s.description2 && (
              <p
                style={{
                  fontSize: "clamp(12px, 1.3vw, 13px)",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                  margin: "4px 0 0",
                }}
              >
                {s.description2}
              </p>
            )}
            {"note" in s && s.note && (
              <span
                style={{
                  fontSize: "clamp(11px, 1.2vw, 12px)",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                {s.note}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Label pour aller plus loin */}
      <p
        style={{
          fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          margin: "0 0 16px",
        }}
      >
        Pour aller plus loin
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Audit */}
        <div style={card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 4,
            }}
          >
            <ShieldCheck
              size={20}
              style={{ color: "#93c5fd", flexShrink: 0 }}
            />
            <h3
              style={{
                fontSize: "clamp(14px, 1.8vw, 16px)",
                fontWeight: 500,
                margin: 0,
                color: "#fff",
              }}
            >
              L&apos;audit de sécurité — qu&apos;est-ce que c&apos;est ?
            </h3>
          </div>
          <p
            style={{
              fontSize: "clamp(12px, 1.4vw, 14px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              margin: "0 0 12px",
            }}
          >
            Un diagnostic complet du site existant du client :
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 4,
            }}
          >
            <ul style={{ margin: 0, padding: 0 }}>
              {auditItems.slice(0, 4).map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </ul>
            <ul style={{ margin: 0, padding: 0 }}>
              {auditItems.slice(4).map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </ul>
          </div>
        </div>

        {/* RGPD */}
        <div style={card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 4,
            }}
          >
            <Lock size={20} style={{ color: "#93c5fd", flexShrink: 0 }} />
            <h3
              style={{
                fontSize: "clamp(14px, 1.8vw, 16px)",
                fontWeight: 500,
                margin: 0,
                color: "#fff",
              }}
            >
              RGPD intégré dès le premier jour
            </h3>
          </div>
          <p
            style={{
              fontSize: "clamp(12px, 1.4vw, 14px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              margin: "0 0 16px",
            }}
          >
            Privacy by Design — la conformité est construite dans le site dès le
            départ, pas ajoutée après coup. Un avantage concurrentiel réel, pas
            une contrainte.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 20,
            }}
          >
            {rgpdCols.map((col) => (
              <div key={col.title}>
                <p
                  style={{
                    fontSize: "clamp(10px, 1.1vw, 12px)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    margin: "0 0 10px",
                  }}
                >
                  {col.title}
                </p>
                <ul style={{ margin: 0, padding: 0 }}>
                  {col.items.map((item) => (
                    <CheckItem key={item} text={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
