// components/StorySection.tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./StorySection.module.css";
import { parseStoryMarkdown, type ParsedStory } from "@/lib/ParseStoryMarkdown";

const SUPPORTED_LANGS = ["fr", "es"];
const FALLBACK_LANG = "fr";

export default function StorySection() {
  const { t, i18n } = useTranslation();
  const [story, setStory] = useState<ParsedStory | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const lang = SUPPORTED_LANGS.includes(i18n.language)
      ? i18n.language
      : FALLBACK_LANG;

    let cancelled = false;
    setStory(null);
    setFailed(false);

    fetch(`/story/${lang}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("story not found");
        return res.text();
      })
      .then((raw) => {
        if (!cancelled) setStory(parseStoryMarkdown(raw));
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  // Contenu marketing non critique : en cas d'échec, on n'affiche rien
  // plutôt qu'un bloc cassé.
  if (failed) return null;

  return (
    <div className={styles.story}>
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <p className={styles.eyebrow}>{t("story.eyebrow")}</p>

          {story ? (
            <>
              <h2 className={styles.headline}>{story.title}</h2>

              <div className={styles.beats}>
                {story.beats.map((beat, i) => (
                  <div className={styles.beat} key={i}>
                    <span className={styles.beatLabel}>{beat.label}</span>
                    <p className={styles.beatText}>{beat.content}</p>
                  </div>
                ))}
              </div>

              {story.moral && <p className={styles.moral}>{story.moral}</p>}
              {story.conclusion && (
                <p className={styles.punchline}>{story.conclusion}</p>
              )}
            </>
          ) : (
            <div className={styles.skeleton} aria-hidden="true">
              <div className={styles.skeletonLine} style={{ width: "60%" }} />
              <div className={styles.skeletonLine} style={{ width: "95%" }} />
              <div className={styles.skeletonLine} style={{ width: "88%" }} />
              <div className={styles.skeletonLine} style={{ width: "70%" }} />
            </div>
          )}
        </div>

        <div className={styles.visualCol} aria-hidden="true">
          <div className={styles.phone}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              <div className={styles.searchBar}>
                <span className={styles.searchDot} />
                <span className={styles.searchText}>
                  {t("story.searchPlaceholder")}
                </span>
              </div>
              <div className={styles.resultRowGhost} />
              <div className={styles.resultRowGhost} />
              <div className={`${styles.resultRow} ${styles.resultActive}`}>
                <span className={styles.resultPin}>●</span>
                {t("story.resultActive")}
              </div>
              <div className={styles.resultRowGhost} />
            </div>
          </div>
          <p className={styles.visualCaption}>{t("story.visualCaption")}</p>
        </div>
      </div>
    </div>
  );
}
