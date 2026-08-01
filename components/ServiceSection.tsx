// components/ServiceSection.tsx

"use client";

import { Check, X, ShieldCheck, Lock, Zap } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// ─── Types ──────────────────────────────────────────────────────────────────

type PlanContent = {
  name: string;
  tag: string | null;
  price: string;
  sub: string;
  pitch: string;
  features: string[];
  cta: string;
};

type AddonContent = {
  title: string;
  price: string;
  items: string[];
};

type ComparisonRow = {
  label: string;
  starter: string | boolean;
  pro: string | boolean;
  custom: string | boolean;
};

// ─── Config non traduisible (couleurs, icônes, mise en avant) ───────────────

const PLAN_META = [
  { id: "starter", accent: "#93c5fd", highlight: false },
  { id: "pro", accent: "#5ddfff", highlight: true },
  { id: "custom", accent: "#a78bfa", highlight: false },
] as const;

const ADDON_META = [
  {
    id: "security",
    icon: <ShieldCheck size={20} style={{ color: "#93c5fd", flexShrink: 0 }} />,
  },
  {
    id: "maintenance",
    icon: <Zap size={20} style={{ color: "#fbbf24", flexShrink: 0 }} />,
  },
  {
    id: "gdpr",
    icon: <Lock size={20} style={{ color: "#34d399", flexShrink: 0 }} />,
  },
] as const;

// ─── Sub-components ──────────────────────────────────────────────────────────

function CheckItem({ text }: { text: string }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        fontSize: "clamp(12px, 1.3vw, 13px)",
        color: "rgba(255,255,255,0.55)",
        listStyle: "none",
        margin: "5px 0",
      }}
    >
      <Check
        size={13}
        style={{ marginTop: 3, flexShrink: 0, color: "#34d399" }}
      />
      {text}
    </li>
  );
}

function CellValue({ val }: { val: string | boolean }) {
  if (val === true)
    return <Check size={16} style={{ color: "#34d399", margin: "0 auto" }} />;
  if (val === false)
    return (
      <X
        size={15}
        style={{ color: "rgba(255,255,255,0.2)", margin: "0 auto" }}
      />
    );
  return (
    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{val}</span>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ServicesSection() {
  const { t } = useTranslation();
  const [showComparison, setShowComparison] = useState(false);

  const plansContent = t("services.plans", {
    returnObjects: true,
  }) as Record<string, PlanContent>;

  const addonsContent = t("services.addons", {
    returnObjects: true,
  }) as Record<string, AddonContent>;

  const comparisonRows = t("services.comparisonRows", {
    returnObjects: true,
  }) as ComparisonRow[];

  const plans = PLAN_META.map((meta) => ({
    ...meta,
    ...plansContent[meta.id],
  }));

  const addons = ADDON_META.map((meta) => ({
    ...meta,
    ...addonsContent[meta.id],
  }));

  const labelStyle: React.CSSProperties = {
    fontSize: "clamp(0.7rem, 1.1vw, 0.75rem)",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    margin: "0 0 20px",
  };

  return (
    <div className="section-container" style={{ color: "#fff" }}>
      {/* ── Hero ── */}
      <div style={{ marginBottom: "clamp(32px, 6vw, 56px)" }}>
        <h2 className="title">{t("services.title")}</h2>
        <p
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            width: "100%",
            margin: 0,
          }}
        >
          {t("services.intro")}
        </p>
      </div>

      {/* ── Formules ── */}
      <p style={labelStyle}>{t("services.chooseLabel")}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "clamp(10px, 2vw, 16px)",
          marginBottom: "clamp(16px, 3vw, 28px)",
          alignItems: "stretch",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              background: plan.highlight
                ? "rgba(93,223,255,0.07)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${plan.highlight ? "rgba(93,223,255,0.35)" : "rgba(255,255,255,0.09)"}`,
              borderRadius: 18,
              padding: "clamp(18px, 3vw, 28px)",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              position: "relative",
              boxShadow: plan.highlight
                ? "0 0 40px rgba(93,223,255,0.08)"
                : "none",
            }}
          >
            {/* Badge */}
            {plan.tag && (
              <span
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #2563c4, #5ddfff)",
                  borderRadius: 99,
                  padding: "3px 14px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#0a1628",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.05em",
                }}
              >
                {plan.tag}
              </span>
            )}

            {/* Name */}
            <p
              style={{
                fontSize: "clamp(11px, 1.1vw, 12px)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: plan.accent,
                margin: "0 0 8px",
              }}
            >
              {plan.name}
            </p>

            {/* Price */}
            <p
              style={{
                fontSize: "clamp(22px, 4vw, 30px)",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 2px",
                lineHeight: 1,
              }}
            >
              {plan.price}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                margin: "0 0 14px",
              }}
            >
              {plan.sub}
            </p>

            {/* Pitch */}
            <p
              style={{
                fontSize: "clamp(12px, 1.3vw, 13px)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                margin: "0 0 16px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                paddingBottom: 16,
              }}
            >
              {plan.pitch}
            </p>

            {/* Features */}
            <ul style={{ margin: "0 0 20px", padding: 0, flex: 1 }}>
              {plan.features.map((f) => (
                <CheckItem key={f} text={f} />
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              style={{
                display: "block",
                textAlign: "center",
                padding: "11px 0",
                borderRadius: 10,
                background: plan.highlight
                  ? "linear-gradient(135deg, #2563c4, #5ddfff)"
                  : "rgba(255,255,255,0.07)",
                border: plan.highlight
                  ? "none"
                  : "1px solid rgba(255,255,255,0.12)",
                color: plan.highlight ? "#0a1628" : "#fff",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      {/* ── Toggle comparateur ── */}
      <div
        style={{ textAlign: "center", marginBottom: "clamp(28px, 5vw, 48px)" }}
      >
        <button
          onClick={() => setShowComparison(!showComparison)}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            padding: "8px 20px",
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(93,223,255,0.4)";
            e.currentTarget.style.color = "#5ddfff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          {showComparison
            ? t("services.compareHide")
            : t("services.compareShow")}
        </button>
      </div>

      {/* ── Comparateur ── */}
      {showComparison && (
        <div
          style={{
            marginBottom: "clamp(28px, 5vw, 48px)",
            overflowX: "auto",
          }}
        >
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    color: "rgba(255,255,255,0.3)",
                    fontWeight: 500,
                    fontSize: 12,
                  }}
                >
                  {t("services.tableFeature")}
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    style={{
                      textAlign: "center",
                      padding: "10px 12px",
                      color: p.accent,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    background:
                      i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {row.label}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <CellValue val={row.starter} />
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <CellValue val={row.pro} />
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <CellValue val={row.custom} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Addons ── */}
      <p style={labelStyle}>{t("services.addonsLabel")}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "clamp(10px, 2vw, 16px)",
        }}
      >
        {addons.map((addon) => (
          <div
            key={addon.id}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 16,
              padding: "clamp(14px, 2.5vw, 22px)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {addon.icon}
              <div>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 15px)",
                    fontWeight: 600,
                    margin: 0,
                    color: "#fff",
                  }}
                >
                  {addon.title}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.35)",
                    margin: 0,
                  }}
                >
                  {addon.price}
                </p>
              </div>
            </div>
            <ul style={{ margin: 0, padding: 0 }}>
              {addon.items.map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Garantie ── */}
      <div
        style={{
          marginTop: "clamp(28px, 5vw, 48px)",
          background: "rgba(52,211,153,0.05)",
          border: "1px solid rgba(52,211,153,0.15)",
          borderRadius: 14,
          padding: "clamp(14px, 2.5vw, 22px)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 28, flexShrink: 0 }}>🛡️</span>
        <div>
          <p
            style={{
              fontSize: "clamp(13px, 1.5vw, 14px)",
              fontWeight: 600,
              margin: "0 0 4px",
              color: "#34d399",
            }}
          >
            {t("services.guaranteeTitle")}
          </p>
          <p
            style={{
              fontSize: "clamp(11px, 1.2vw, 13px)",
              color: "rgba(255,255,255,0.45)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {t("services.guaranteeText")}
          </p>
        </div>
      </div>
    </div>
  );
}
