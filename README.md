# AI News Portal — Siap Pakai

Portal berita/artikel siap pakai dengan kategori: **Teknologi, Perkembangan AI, Olahraga, Lifestyle, Selebritis**.

## Fitur
- Auto-update dari sumber populer via **RSS** (tanpa database).
- **Halaman artikel** (ringkasan + link ke sumber asli).
- **Kategori** terpisah.
- **Admin dashboard** untuk tambah/edit/hapus artikel manual (client-side localStorage, bisa Export/Import JSON).
- **SEO-ready** (Next.js App Router, metadata).
- Tampilan **modern** dengan **Tailwind**.
- **Siap deploy ke Vercel**.

## Jalankan Lokal
```bash
npm i
npm run dev
```

## Deploy ke Vercel
1. Buat project di Vercel, import repo ini.
2. (Opsional) Set env `NEXT_PUBLIC_ADMIN_PASS` untuk password admin.
3. Deploy. Konten dari RSS akan tampil otomatis.

## Sumber & Lisensi Konten
Aplikasi hanya menampilkan **judul, ringkasan, dan tautan** ke sumber asli. Hak cipta konten tetap pada penerbit.
