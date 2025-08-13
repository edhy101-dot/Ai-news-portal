'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/kategori/teknologi", label: "Teknologi" },
  { href: "/kategori/perkembangan-ai", label: "Perkembangan AI" },
  { href: "/kategori/olahraga", label: "Olahraga" },
  { href: "/kategori/lifestyle", label: "Lifestyle" },
  { href: "/kategori/selebritis", label: "Selebritis" },
  { href: "/admin", label: "Admin" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
      <nav className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold text-lg">AI News Portal</Link>
        <div className="flex gap-3 overflow-x-auto">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1 rounded-full hover:bg-gray-100 transition whitespace-nowrap ${pathname===l.href?'bg-black text-white':''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
