"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Titoli `[data-split]`: divisi in parole mascherate che emergono una
 * dopo l'altra. `data-split-delay` (secondi) per i titoli above-the-fold.
 * Solo transform: nessun blur o filtro, quindi resta fluido anche su mobile.
 */
export default function SplitTitles() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const titles = document.querySelectorAll<HTMLElement>("[data-split]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      titles.forEach((el) => (el.style.visibility = "visible"));
      return;
    }

    const ctx = gsap.context(() => {
      titles.forEach((el) => {
        const delay = Number(el.dataset.splitDelay ?? 0);
        SplitText.create(el, {
          type: "words",
          mask: "words",
          wordsClass: "split-word",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.words, {
              yPercent: 118,
              duration: 1.35,
              ease: "expo.out",
              stagger: 0.055,
              delay,
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            });
          },
        });
      });
    });

    // le immagini caricate dopo possono spostare i titoli: ricalcola i trigger
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
