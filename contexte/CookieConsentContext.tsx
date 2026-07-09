// context/CookieConsentContext.tsx
"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  ReactNode,
} from "react";

export type ConsentStatus = "accepted" | "refused" | null;

const STORAGE_KEY = "cookie_consent";

type CookieConsentContextValue = {
  consent: ConsentStatus;
  hasChosen: boolean;
  acceptCookies: () => void;
  refuseCookies: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

// --- External store pour localStorage ---
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): ConsentStatus {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "accepted" || stored === "refused" ? stored : null;
}

function getServerSnapshot(): ConsentStatus {
  // Côté serveur, aucun choix n'est encore connu
  return null;
}

function notifyListeners() {
  listeners.forEach((cb) => cb());
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const persist = (value: NonNullable<ConsentStatus>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    notifyListeners(); // force la resynchronisation dans le même onglet
  };

  const acceptCookies = () => persist("accepted");
  const refuseCookies = () => persist("refused");

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasChosen: consent !== null,
        acceptCookies,
        refuseCookies,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent doit être utilisé dans un CookieConsentProvider",
    );
  }
  return ctx;
}
