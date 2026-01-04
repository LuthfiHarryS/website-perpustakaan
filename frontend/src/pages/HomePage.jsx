import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api.js'
import { BookCard } from '../components/BookCard.jsx'
import { Chatbot } from '../components/Chatbot.jsx'

export function HomePage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const data = await apiGet('/api/books/random')
        if (!mounted) return
        setBooks(data?.books ?? [])
        setError('')
      } catch (e) {
        if (!mounted) return
        setError(e.message || 'Gagal memuat buku.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [refreshKey])

  function handleRefresh() {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      {/* Hero section - menarik perhatian tanpa overwhelming (Cognitive Load Theory) */}
      <section className="panel rounded-3xl p-6 shadow-lg ring-1 ring-black/5">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-slate-900">
              Cari buku yang pas buat kamu ✨
            </h1>
            <p className="text-sm text-slate-600">
              Ada banyak buku menarik yang bisa kamu explore. Mulai dari novel seru sampai buku
              motivasi!
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-95 disabled:opacity-50"
          >
            🔄 Refresh
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-sm text-slate-500">Memuat rekomendasi...</div>
          </div>
        )}
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {books.map((b) => (
              <BookCard key={b._id} book={b} showQuickInfo={true} />
            ))}
          </div>
        )}
      </section>

      {/* Quick tips section - motivasi tanpa menggurui */}
      <section className="panel rounded-3xl p-5 shadow-lg ring-1 ring-black/5">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-slate-900 p-3 text-2xl">💡</div>
          <div className="flex-1">
            <div className="mb-1 font-semibold text-slate-900">Tips nih!</div>
            <p className="text-sm text-slate-600">
              Coba mulai dari buku tipis dulu (kurang dari 200 halaman). Setelah selesai, rasanya
              puas banget lho! 😎
            </p>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}


