import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { apiGet } from '../lib/api.js'
import { CONDITIONAL_TIPS } from '../components/TipsSection.jsx'

export function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const data = await apiGet(`/api/books/${id}`)
        if (!mounted) return
        setBook(data?.book ?? null)
        setError('')
      } catch (e) {
        if (!mounted) return
        setError(e.message || 'Gagal memuat detail buku.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [id])

  function handleBack() {
    // Kembali ke halaman sebelumnya (history back)
    // Jika tidak ada history, fallback ke beranda
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  function handleGenreClick(genre) {
    // Navigate ke halaman daftar buku dengan filter genre
    navigate(`/books?genre=${encodeURIComponent(genre)}`)
  }

  return (
    <div className="space-y-5">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition cursor-pointer"
      >
        ← Kembali
      </button>

      <section className="panel rounded-3xl p-6 shadow-lg ring-1 ring-black/5">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-sm text-slate-500">Memuat detail buku...</div>
          </div>
        )}
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
        )}

        {!loading && !error && book && (
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Cover di kiri */}
            <div className="flex-shrink-0 md:w-[220px]">
              <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
                <img
                  src={book.cover_url}
                  alt={book.judul}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            {/* Detail di kanan */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{book.judul}</h1>
              <div className="mt-2 text-base text-slate-600">{book.pengarang}</div>

              {/* Genre badges - bisa diklik untuk filter */}
              {book.genre && book.genre.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {book.genre.map((g) => (
                    <button
                      key={g}
                      onClick={() => handleGenreClick(g)}
                      className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white transition hover:bg-slate-700 hover:scale-105 active:scale-95 cursor-pointer"
                      title={`Lihat semua buku ${g}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Info label="Tahun terbit" value={String(book.tahun_terbit)} />
                <Info label="Penerbit" value={book.penerbit} />
                <Info label="Bahasa" value={book.bahasa} />
                <Info
                  label="Halaman"
                  value={`${book.jumlah_halaman || 0} halaman`}
                  highlight={book.jumlah_halaman < 200}
                />
                <Info
                  label="Status"
                  value={book.status}
                  highlight={book.status === 'Tersedia'}
                />
              </div>

              <div className="mt-8">
                <h2 className="mb-3 text-lg font-bold text-slate-900">Sinopsis</h2>
                <p className="whitespace-pre-wrap text-base leading-7 text-slate-700">
                  {book.sinopsis}
                </p>
              </div>

              {/* Tips berdasarkan kondisi buku */}
              <div className="mt-6 space-y-3">
                {book.jumlah_halaman > 400 && (
                  <div className={`rounded-xl border-2 p-4 ${CONDITIONAL_TIPS.longBook.color}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">{CONDITIONAL_TIPS.longBook.emoji}</span>
                      <strong className="text-sm">{CONDITIONAL_TIPS.longBook.title}</strong>
                    </div>
                    <p className="text-sm leading-relaxed">{CONDITIONAL_TIPS.longBook.content}</p>
                  </div>
                )}

                {book.jumlah_halaman > 0 && book.jumlah_halaman < 200 && (
                  <div className={`rounded-xl border-2 p-4 ${CONDITIONAL_TIPS.shortBook.color}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">{CONDITIONAL_TIPS.shortBook.emoji}</span>
                      <strong className="text-sm">{CONDITIONAL_TIPS.shortBook.title}</strong>
                    </div>
                    <p className="text-sm leading-relaxed">{CONDITIONAL_TIPS.shortBook.content}</p>
                  </div>
                )}

                {book.genre?.includes('Filsafat') && (
                  <div className={`rounded-xl border-2 p-4 ${CONDITIONAL_TIPS.philosophy.color}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">{CONDITIONAL_TIPS.philosophy.emoji}</span>
                      <strong className="text-sm">{CONDITIONAL_TIPS.philosophy.title}</strong>
                    </div>
                    <p className="text-sm leading-relaxed">{CONDITIONAL_TIPS.philosophy.content}</p>
                  </div>
                )}

                {book.genre?.includes('Biografi') && (
                  <div className={`rounded-xl border-2 p-4 ${CONDITIONAL_TIPS.biography.color}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">{CONDITIONAL_TIPS.biography.emoji}</span>
                      <strong className="text-sm">{CONDITIONAL_TIPS.biography.title}</strong>
                    </div>
                    <p className="text-sm leading-relaxed">{CONDITIONAL_TIPS.biography.content}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function Info({ label, value, highlight = false }) {
  return (
    <div
      className={`rounded-xl p-3 ring-1 ${
        highlight
          ? 'bg-green-50 ring-green-200'
          : 'bg-white/70 ring-black/5'
      }`}
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className={`mt-1 text-sm font-medium ${
        highlight ? 'text-green-900' : 'text-slate-900'
      }`}>
        {value || '-'}
      </div>
    </div>
  )
}


