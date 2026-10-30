import type { CSSProperties } from "react";

type RevealKind = "up" | "fade" | "image";

/**
 * Props per lo scroll reveal: `{...reveal(1)}` su qualsiasi elemento.
 * `delay` è un indice di stagger (×90ms). Funziona anche nei Server Components.
 */
export function reveal(delay = 0, kind: RevealKind = "up") {
  return {
    "data-reveal": kind,
    style: { "--d": delay } as CSSProperties,
  };
}

/** Stagger per gli elementi del titolo hero (animazione solo CSS) */
export function delay(d: number) {
  return { style: { "--d": d } as CSSProperties };
}

/**
 * Script eseguito nell'<head> prima del primo paint:
 * - aggiunge `js` (abilita i reveal) con fallback se lo script client
 *   non parte entro 2.5s, così il contenuto non resta mai nascosto;
 * - attiva l'intro del logo una sola volta per sessione.
 */
export const headScript = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.classList.contains('rv'))d.classList.remove('js')},2500);try{var m=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!m&&!sessionStorage.getItem('vsc-intro')){d.classList.add('intro');sessionStorage.setItem('vsc-intro','1')}}catch(e){}})();`;
