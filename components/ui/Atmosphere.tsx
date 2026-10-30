/** Sfondo atmosferico sfumato, stesso linguaggio della Hero della home */
export default function Atmosphere({
  variant = "a",
}: {
  variant?: "a" | "b";
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {variant === "a" ? (
        <>
          <div className="absolute -left-[12%] -top-[25%] h-[620px] w-[620px] rounded-full bg-[#C8AD92]/22 blur-[120px]" />
          <div className="absolute left-[18%] top-[30%] h-[520px] w-[520px] rounded-full bg-[#DCCABC]/20 blur-[140px]" />
          <div className="absolute -right-[10%] bottom-[-30%] h-[620px] w-[620px] rounded-full bg-[#A98C74]/12 blur-[150px]" />
        </>
      ) : (
        <>
          <div className="absolute -right-[14%] -top-[18%] h-[620px] w-[620px] rounded-full bg-[#C8AD92]/18 blur-[140px]" />
          <div className="absolute -left-[10%] bottom-[-20%] h-[560px] w-[560px] rounded-full bg-[#DCCABC]/16 blur-[150px]" />
        </>
      )}
    </div>
  );
}
