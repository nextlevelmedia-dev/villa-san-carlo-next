"use client";

import { openConsentBanner } from "@/lib/consent";

export default function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentBanner} className={className}>
      Preferenze cookie
    </button>
  );
}
