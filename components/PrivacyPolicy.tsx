// components/PrivacyPolicy.tsx
"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

const FALLBACK_LOCALE = "en";

type PrivacyPolicyProps = {
  hideTitle?: boolean;
};

export default function PrivacyPolicy({
  hideTitle = false,
}: PrivacyPolicyProps) {
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const lang = i18n.language?.split("-")[0] || FALLBACK_LOCALE;

    async function load() {
      try {
        const res = await fetch(`/content/privacy-policy.${lang}.md`);
        if (!res.ok) throw new Error("not found");
        const text = await res.text();
        if (!cancelled) setContent(text);
      } catch {
        const res = await fetch(
          `/content/privacy-policy.${FALLBACK_LOCALE}.md`,
        );
        const text = await res.text();
        if (!cancelled) setContent(text);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  if (!content) return <p style={{ color: "white" }}>...</p>;

  return (
    <>
      <ReactMarkdown
        components={{
          h2: ({ children }) =>
            hideTitle ? null : (
              <h2 style={{ color: "white", marginTop: 0 }}>{children}</h2>
            ),
          h3: ({ children }) => <h3 style={titleStyle}>{children}</h3>,
          ul: ({ children }) => <ul style={listStyle}>{children}</ul>,
        }}
      >
        {content}
      </ReactMarkdown>

      <p style={{ marginTop: 40, fontSize: ".9rem", opacity: 0.75 }}>
        {t("privacyPolicy.lastUpdated", { date: "juillet 2026" })}
      </p>
    </>
  );
}

const titleStyle: React.CSSProperties = { marginTop: 28, color: "#5c7cfa" };
const listStyle: React.CSSProperties = { paddingLeft: 20, lineHeight: 1.8 };
