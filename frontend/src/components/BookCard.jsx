import { Link } from 'react-router-dom'

export function BookCard({ book, showQuickInfo = false }) {
  // Quick info untuk menarik perhatian remaja (Cognitive Load Theory - hanya info penting)
  const quickInfo = book.genre?.[0] || 'Buku'
  const pageCount = book.jumlah_halaman || 0
  const isShort = pageCount < 200
  const isMedium = pageCount >= 200 && pageCount < 400

  return (
    <Link
      to={`/books/${book._id}`}
      className="group relative block overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/5 transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-slate-300"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100">
        <img
          src={book.cover_url}
          alt={book.judul}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Quick badge overlay - Fitts' Law: mudah diklik, tidak mengganggu */}
        {showQuickInfo && (
          <div className="absolute left-2 top-2 rounded-lg bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {quickInfo}
          </div>
        )}
        {/* Hover effect - visual feedback */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-3">
        <div className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-slate-700">
          {book.judul}
        </div>
        {showQuickInfo && (
          <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
            <span>{book.pengarang || 'Anonim'}</span>
            {pageCount > 0 && (
              <>
                <span>•</span>
                <span className={isShort ? 'text-green-600' : isMedium ? 'text-yellow-600' : ''}>
                  {pageCount} hlm
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}


