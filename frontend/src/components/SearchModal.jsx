import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../lib/api.js'

export function SearchModal({ open, onClose }) {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const canSearch = useMemo(() => q.trim().length > 0, [q])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    setError('')
    setBooks([])
    setQ('')
    const t = setTimeout(() => inputRef.current?.focus(), 0)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    if (!canSearch) {
      setBooks([])
      setError('')
      return
    }

    const handle = setTimeout(async () => {
      try {
        setLoading(true)
        const data = await apiGet(`/api/books/search?q=${encodeURIComponent(q.trim())}`)
        setBooks(data?.books ?? [])
        setError('')
      } catch (e) {
        setError(e.message || 'Gagal mencari buku.')
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => clearTimeout(handle)
  }, [open, q, canSearch])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4 pt-20"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
          <div className="text-lg">🔍</div>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
            placeholder="Cari judul buku..."
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Batal
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto p-4">
          {loading && (
            <div className="text-sm text-slate-600">Mencari buku...</div>
          )}
          {error && <div className="text-sm text-red-700">{error}</div>}

          {!loading && canSearch && !error && books.length === 0 && (
            <div className="text-sm text-slate-700">
              Buku tidak ditemukan di perpustakaan
            </div>
          )}

          {books.length > 0 && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {books.map((b) => (
                <Link
                  key={b._id}
                  to={`/books/${b._id}`}
                  onClick={onClose}
                  className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 hover:bg-slate-50"
                >
                  <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={b.cover_url}
                      alt={b.judul}
                      className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-2 line-clamp-2 text-sm font-semibold text-slate-900">
                    {b.judul}
                  </div>
                  <div className="mt-1 line-clamp-1 text-xs text-slate-600">
                    {b.pengarang}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


