import { Fragment, type ReactNode } from "react";

export interface ParsedStorySection {
  label: string;
  content: ReactNode;
}

export interface ParsedStory {
  title: string;
  /** Les 3 premiers blocs narratifs (problème / tournant / résultat) */
  beats: ParsedStorySection[];
  moral: ReactNode | null;
  conclusion: ReactNode | null;
}

/**
 * Convertit **gras** et *italique* en éléments React.
 * Volontairement minimal : la story est un contenu qu'on maîtrise,
 * pas du markdown arbitraire venant d'un utilisateur.
 */
function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*.+?\*\*|\*.+?\*)/g).filter(Boolean);

  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={i}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={i}>{token.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{token}</Fragment>;
  });
}

/**
 * Structure markdown attendue :
 *
 * # Titre
 *
 * ## Premier bloc narratif
 * texte...
 *
 * ## Deuxième bloc narratif
 * texte...
 *
 * ## Troisième bloc narratif
 * texte...
 *
 * ## Morale
 * texte...
 *
 * ## Conclusion
 * texte...
 */
export function parseStoryMarkdown(raw: string): ParsedStory {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  let title = "";
  const sections: { label: string; body: string }[] = [];
  let current: { label: string; body: string[] } | null = null;

  for (const line of lines) {
    if (line.startsWith("# ")) {
      title = line.slice(2).trim();
      continue;
    }
    if (line.startsWith("## ")) {
      if (current) {
        sections.push({ label: current.label, body: current.body.join(" ").trim() });
      }
      current = { label: line.slice(3).trim(), body: [] };
      continue;
    }
    if (current) {
      const trimmed = line.trim();
      if (trimmed.length > 0) current.body.push(trimmed);
    }
  }
  if (current) {
    sections.push({ label: current.label, body: current.body.join(" ").trim() });
  }

  const beatSections = sections.slice(0, Math.max(0, sections.length - 2));
  const moralSection = sections[sections.length - 2] ?? null;
  const conclusionSection = sections[sections.length - 1] ?? null;

  return {
    title,
    beats: beatSections.map((s) => ({
      label: s.label,
      content: renderInline(s.body),
    })),
    moral: moralSection ? renderInline(moralSection.body) : null,
    conclusion: conclusionSection ? renderInline(conclusionSection.body) : null,
  };
}