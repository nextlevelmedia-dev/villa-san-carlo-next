/** Separatore decorativo della home: linea · ✦ · linea */
export default function Ornament({
  align = "left",
  light = false,
  className = "",
}: {
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  const line = light ? "bg-white/55" : "bg-[#CDB9A7]";

  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      <span className={`h-px ${align === "center" ? "w-10" : "w-14"} ${line}`} />
      <span className={`text-[10px] ${light ? "text-white/75" : "text-[#B69A82]"}`}>
        ✦
      </span>
      <span className={`h-px ${align === "center" ? "w-10" : "w-8"} ${line}`} />
    </div>
  );
}
