import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";

/** Breadcrumb visibile + BreadcrumbList strutturato */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Percorso di navigazione">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-[#6F625A]">
          {all.map((item, index) => {
            const last = index === all.length - 1;

            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-[#4A281B]">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className="transition-colors duration-300 hover:text-[#4A281B]"
                    >
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="text-[#C8AD92]">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
