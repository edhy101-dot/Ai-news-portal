import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@/lib/types";

export default function ArticleCard({ item }: { item: FeedItem }) {
  return (
    <article className="card h-full flex flex-col">
      <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden">
        {item.image ? (
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        ) : null}
      </div>
      <div className="mt-3">
        <div className="badge">{item.category}</div>
        <h3 className="mt-2 text-lg font-semibold leading-snug">
          <Link href={`/artikel/${item.slug}`} className="hover:underline">
            {item.title}
          </Link>
        </h3>
        <p className="text-sm text-muted mt-2">{item.excerpt}</p>
        <div className="text-xs text-gray-400 mt-3">
          {item.source} • {item.isoDate ? new Date(item.isoDate).toLocaleString() : ""}
        </div>
      </div>
    </article>
  );
}
