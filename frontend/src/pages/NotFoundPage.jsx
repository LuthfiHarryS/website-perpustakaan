import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="panel rounded-3xl p-8 shadow-lg ring-1 ring-black/5">
      <div className="text-lg font-semibold text-slate-900">Halaman tidak ditemukan</div>
      <div className="mt-2 text-sm text-slate-700">
        Coba kembali ke beranda atau daftar buku.
      </div>
      <div className="mt-5 flex gap-3">
        <Link
          to="/"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Beranda
        </Link>
        <Link
          to="/books"
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-black/10 hover:bg-slate-50"
        >
          Daftar buku
        </Link>
      </div>
    </div>
  )
}


