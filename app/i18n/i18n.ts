// app/i18n/i18n.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "./locales/fr/translation.json";
import es from "./locales/es/translation.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector) // Detecte la langue de l'utilisateur
    .use(initReactI18next) // Connecte i18next à React
    .init({
      resources: {
        fr: { translation: fr },
        es: { translation: es },
      },
      fallbackLng: "fr", // Langue par défaut si la détection échoue
      interpolation: {
        escapeValue: false, // React se charge déjà de l'échappement
      },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"], // Mémorise la langue de l'utilisateur dans le localStorage
      },
    });
}

export default i18n;
