// app/providers.tsx
"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
import { ReactNode, useEffect } from "react";
import LanguageDetector from "i18next-browser-languagedetector";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Une fois hydraté, on détecte la vraie langue de l'utilisateur
    // et on bascule dessus si besoin (ex: "es" stocké en localStorage).
    const detector = new LanguageDetector();
    detector.init({
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    });
    const detected = detector.detect();
    const lang = Array.isArray(detected) ? detected[0] : detected;

    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
