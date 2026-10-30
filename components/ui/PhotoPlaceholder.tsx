/**
 * Segnaposto elegante per fotografie non ancora disponibili.
 * Si sostituisce automaticamente quando l'unità riceve delle foto
 * (vedi lib/stays.ts).
 */
export default function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — fotografie in aggiornamento`}
      className={`relative flex flex-col items-center justify-center gap-4 overflow-hidden border border-[#E2D6C9] bg-[#EFE7DD] text-center ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-3 border border-[#D8CABB]/70"
      />
      <span
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C8AD92] text-sm tracking-[0.08em] text-[#7A5F49]"
      >
        SC
      </span>
      <span
        aria-hidden="true"
        className="px-6 text-[10px] uppercase tracking-[0.22em] text-[#6F625A]"
      >
        Fotografie in aggiornamento
      </span>
    </div>
  );
}
