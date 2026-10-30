"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Unico IntersectionObserver per tutto il sito: aggiunge `is-in` agli
 * elementi `[data-reveal]` quando entrano nel viewport, una sola volta.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("rv");

    const elements = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not(.is-in)",
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
