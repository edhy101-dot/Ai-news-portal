import { findBySlug } from "@/lib/fetchFeeds";
import Link from "next/link";

export const revalidate = 600;

export default async function ArticleDetail({ params }: { params: { slug: string }}) {
  const item = await findBySlug(params.slug);
  if (!item) {
    return (
      <div className="card">
        <h1 className="text-xl font-semibold">Artikel tidak ditemukan</h1>
        <p className="text-muted mt-2">Mungkin sudah tidak tersedia di sumber.</p>
        <Link className="btn mt-4" href="/">Kembali</Link>
      </div>
    );
  }

  return (
    <article className="prose max-w-none">
      <div className="badge">{item.category}</div>
      <h1 className="mt-2">{item.title}</h1>
      <p className="text-sm text-gray-500">
        {item.source} • {item.isoDate ? new Date(item.isoDate).toLocaleString() : ""}
      </p>
      <div className="mt-4">
        {item.excerpt ? <p>{item.excerpt}</p> : null}
        <p className="mt-4">
          Baca selengkapnya di sumber asli:{" "}
          <a className="underline" href={item.link} target="_blank" rel="noopener noreferrer">
            {item.link}
          </a>
        </p>
        <div className="p-4 bg-yellow-50 rounded-xl text-sm mt-4">
          Catatan: Konten lengkap tetap milik sumber asli. Situs ini hanya menampilkan ringkasan dan tautan.
        </div>
      </div>
    </article>
  );
}
