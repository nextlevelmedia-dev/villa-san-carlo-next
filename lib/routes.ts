/** Pagine indicizzabili — fonte unica per la sitemap */
export const indexableRoutes: {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/la-villa", priority: 0.8, changeFrequency: "yearly" },
  { path: "/cerimonie", priority: 0.9, changeFrequency: "monthly" },
  { path: "/eventi-meeting", priority: 0.8, changeFrequency: "monthly" },
  { path: "/eventi-privati", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soggiorni", priority: 0.9, changeFrequency: "monthly" },
  { path: "/soggiorni/camere", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soggiorni/appartamenti", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contatti", priority: 0.7, changeFrequency: "yearly" },
];
