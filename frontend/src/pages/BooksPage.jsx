import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiGet } from '../lib/api.js'
import { BookCard } from '../components/BookCard.jsx'
import { TipsSection } from '../components/TipsSection.jsx'

const SORT_OPTIONS = [
  { value: 'az', label: 'A–Z' },
  { value: 'za', label: 'Z–A' },
  { value: 'terbaru', label: 'Terbaru' },
  { value: 'terlama', label: 'Terlama' },
]

export function BooksPage({ genres }) {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Baca genre dari URL query params saat pertama kali load
  const initialGenre = searchParams.get('genre') || ''
  const initialGenres = initialGenre ? initialGenre.split(',').filter(Boolean) : []
  
  const [selectedGenres, setSelectedGenres] = useState(initialGenres)
  const [sort, setSort] = useState(searchParams.get('sort') || 'az')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const genreParam = useMemo(() => selectedGenres.join(','), [selectedGenres])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const qs = new URLSearchParams()
        if (genreParam) qs.set('genre', genreParam)
        if (sort) qs.set('sort', sort)
        const data = await apiGet(`/api/books?${qs.toString()}`)
        if (!mounted) return
        setBooks(data?.books ?? [])
        setError('')
      } catch (e) {
        if (!mounted) return
        setError(e.message || 'Gagal memuat daftar buku.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [genreParam, sort])

  function toggleGenre(g) {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
      // Update URL query params saat genre berubah
      const newParams = new URLSearchParams(searchParams)
      if (newGenres.length > 0) {
        newParams.set('genre', newGenres.join(','))
      } else {
        newParams.delete('genre')
      }
      setSearchParams(newParams)
      return newGenres
    })
  }
  
  // Update URL saat sort berubah
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)
    if (sort && sort !== 'az') {
      newParams.set('sort', sort)
    } else {
      newParams.delete('sort')
    }
    // Hanya update jika berbeda dengan URL saat ini
    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort])

  return (
    <div className="space-y-6">
      <section className="panel rounded-3xl p-6 shadow-lg ring-1 ring-black/5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Semua Buku 📚</h1>
            <p className="mt-1 text-sm text-slate-600">
              Pilih genre favorit kamu atau langsung explore semua buku!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-800">Sorting</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-7">
          {genres.map((g) => (
            <label
              key={g}
              className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm text-slate-900 ring-1 ring-black/5"
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(g)}
                onChange={() => toggleGenre(g)}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </section>

      {loading && <div className="text-sm text-slate-100">Memuat...</div>}
      {error && <div className="text-sm text-red-100">{error}</div>}

      {!loading && !error && (
        <>
          {books.length > 0 ? (
            <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {books.map((b) => (
                <BookCard key={b._id} book={b} />
              ))}
            </section>
          ) : (
            <section className="panel rounded-3xl p-8 text-center shadow-lg ring-1 ring-black/5">
              <div className="mb-4 text-5xl">📚</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                Belum ada buku yang sesuai filter
              </h3>
              <p className="mb-6 text-sm text-slate-600">
                Coba ubah filter genre atau hapus filter untuk melihat semua buku
              </p>
              <TipsSection variant="single" />
            </section>
          )}

          {/* Tips section muncul setelah hasil */}
          {books.length > 0 && (
            <section className="panel rounded-3xl p-6 shadow-lg ring-1 ring-black/5">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <h2 className="text-lg font-bold text-slate-900">Tips Membaca</h2>
              </div>
              <TipsSection variant="single" />
            </section>
          )}
        </>
      )}
    </div>
  )
}


