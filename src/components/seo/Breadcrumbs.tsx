import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem =
  | { name: string; item: string; label?: never; href?: never; url?: never }
  | { label: string; href: string; name?: never; item?: never; url?: never }
  | { name: string; url: string; label?: never; href?: never; item?: never }
  | { label: string; url: string; name?: never; href?: never; item?: never };

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const normalizedItems = items.map((it) => ({
    label: it.name || it.label || "",
    url: it.item || it.href || it.url || "/",
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: normalizedItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url.startsWith("http")
        ? item.url
        : `https://www.thermostatcopropriete.fr${item.url}`,
    })),
  };

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`flex items-center text-xs text-slate-500 overflow-x-auto py-2 ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        {normalizedItems.map((item, idx) => {
          const isLast = idx === normalizedItems.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              )}
              {idx === 0 && <Home className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />}
              {isLast ? (
                <span className="font-semibold text-slate-900 truncate max-w-[240px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-sky-600 transition truncate max-w-[200px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
