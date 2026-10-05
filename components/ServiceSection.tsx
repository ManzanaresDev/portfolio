"use client";

import { Check, ShieldCheck, Zap, Sparkles, ArrowRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

// ─── Types ──────────────────────────────────────────────────────────────────

type PlanContent = {
  name: string;
  price: string;
  sub: string;
  pitch: string;
  features: string[];
  cta: string;
};

type SecurityEntryContent = {
  eyebrow: string;
  title: string;
  description: string;
  priceLabel: string;
  price: string;
  cta: string;
  followupTitle: string;
  followupText: string;
  followupCta: string;
};

type SideCardContent = {
  title: string;
  price: string;
  text: string;
  items: string[];
  cta: string;
};

// ─── Config non traduisible ─────────────────────────────────────────────────

const PLAN_META = [
  { id: "starter", accent: "#93c5fd", highlight: false },
  { id: "pro", accent: "#5ddfff", highlight: true },
] as const;

// ─── Sub-components ─────────────────────────────────────────────────────────

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
      <span>{text}</span>
    </li>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function ServicesSection() {
  const { t } = useTranslation();

  const securityEntry = t("services.securityEntry", {
    returnObjects: true,
  }) as SecurityEntryContent;

  const plansContent = t("services.plans", {
    returnObjects: true,
  }) as Record<string, PlanContent>;

  const custom = t("services.custom", {
    returnObjects: true,
  }) as SideCardContent;

  const maintenance = t("services.maintenance", {
    returnObjects: true,
  }) as SideCardContent;

  const plans = PLAN_META.map((meta) => ({
    ...meta,
    ...plansContent[meta.id],
  }));

  const labelStyle: React.CSSProperties = {
    fontSize: "clamp(0.7rem, 1.1vw, 0.75rem)",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    margin: "0 0 20px",
  };

  const sideCardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 16,
    padding: "clamp(14px, 2.5vw, 22px)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };

  const sideCtaStyle: React.CSSProperties = {
    marginTop: "auto",
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: "#5ddfff",
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    paddingTop: 8,
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

      {/* ── Porte d'entrée : diagnostic WordPress ── */}

      <section
        aria-labelledby="security-entry-title"
        style={{ marginBottom: "clamp(42px, 7vw, 72px)" }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,196,0.12), rgba(93,223,255,0.05))",
            border: "1px solid rgba(93,223,255,0.22)",
            borderRadius: 20,
            padding: "clamp(20px, 4vw, 34px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(93,223,255,0.06)",
              filter: "blur(50px)",
              right: -80,
              top: -100,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              {/* Eyebrow */}

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ShieldCheck
                  size={20}
                  style={{ color: "#5ddfff", flexShrink: 0 }}
                />

                <p
                  style={{
                    fontSize: "clamp(10px, 1.1vw, 12px)",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#5ddfff",
                    margin: 0,
                  }}
                >
                  {securityEntry.eyebrow}
                </p>
              </div>

              {/* Contenu + prix */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: "clamp(20px, 5vw, 48px)",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3
                    id="security-entry-title"
                    style={{
                      fontSize: "clamp(20px, 3vw, 28px)",
                      lineHeight: 1.2,
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 12px",
                    }}
                  >
                    {securityEntry.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "clamp(13px, 1.5vw, 15px)",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.55)",
                      margin: 0,
                      maxWidth: 720,
                    }}
                  >
                    {securityEntry.description}
                  </p>
                </div>

                <div
                  style={{
                    minWidth: 150,
                    textAlign: "center",
                    padding: "16px 20px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      margin: "0 0 4px",
                    }}
                  >
                    {securityEntry.priceLabel}
                  </p>

                  <p
                    style={{
                      fontSize: "clamp(20px, 3vw, 25px)",
                      fontWeight: 700,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {securityEntry.price}
                  </p>
                </div>
              </div>

              {/* CTA */}

              <div>
                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "11px 18px",
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #2563c4, #5ddfff)",
                    color: "#0a1628",
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  {securityEntry.cta}
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Pont vers la refonte */}

            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: 20,
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                    margin: "0 0 4px",
                  }}
                >
                  {securityEntry.followupTitle}
                </p>

                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.4)",
                    margin: 0,
                  }}
                >
                  {securityEntry.followupText}
                </p>
              </div>

              <a
                href="#services-plans"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#5ddfff",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {securityEntry.followupCta}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Formules (2) ── */}

      <div id="services-plans">
        <p style={labelStyle}>{t("services.chooseLabel")}</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
                border: `1px solid ${
                  plan.highlight
                    ? "rgba(93,223,255,0.35)"
                    : "rgba(255,255,255,0.09)"
                }`,
                borderRadius: 18,
                padding: "clamp(18px, 3vw, 28px)",
                display: "flex",
                flexDirection: "column",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(93,223,255,0.08)"
                  : "none",
              }}
            >
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

              <p
                style={{
                  fontSize: "clamp(22px, 4vw, 30px)",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 2px",
                  lineHeight: 1.1,
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

              <ul style={{ margin: "0 0 20px", padding: 0, flex: 1 }}>
                {plan.features.map((feature) => (
                  <CheckItem key={feature} text={feature} />
                ))}
              </ul>

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
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sur-mesure + Maintenance ── */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(10px, 2vw, 16px)",
          alignItems: "stretch",
        }}
      >
        {/* Sur-mesure */}

        <div style={sideCardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Sparkles size={20} style={{ color: "#a78bfa", flexShrink: 0 }} />

            <div>
              <p
                style={{
                  fontSize: "clamp(13px, 1.5vw, 15px)",
                  fontWeight: 600,
                  margin: 0,
                  color: "#fff",
                }}
              >
                {custom.title}
              </p>

              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}
              >
                {custom.price}
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: "clamp(12px, 1.3vw, 13px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {custom.text}
          </p>

          <a href="#contact" style={sideCtaStyle}>
            {custom.cta}
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Maintenance */}

        <div style={sideCardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Zap size={20} style={{ color: "#fbbf24", flexShrink: 0 }} />

            <div>
              <p
                style={{
                  fontSize: "clamp(13px, 1.5vw, 15px)",
                  fontWeight: 600,
                  margin: 0,
                  color: "#fff",
                }}
              >
                {maintenance.title}
              </p>

              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}
              >
                {maintenance.price}
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: "clamp(12px, 1.3vw, 13px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {maintenance.text}
          </p>

          <ul style={{ margin: 0, padding: 0 }}>
            {maintenance.items.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>

          <a href="#contact" style={sideCtaStyle}>
            {maintenance.cta}
            <ArrowRight size={13} />
          </a>
        </div>
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