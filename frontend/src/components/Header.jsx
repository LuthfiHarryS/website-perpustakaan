import { Link, useLocation } from 'react-router-dom'

const TITLE = 'Perpustakaan SMAN'

export function Header({ onOpenSearch }) {
  const location = useLocation()

  return (
    <header className="bg-white/60 backdrop-blur-md sticky top-0 z-40 border-b border-black/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link
            to="/books"
            className="text-sm font-medium text-slate-800 hover:text-slate-950 transition"
          >
            Semua Buku
          </Link>
        </div>

        <Link to="/" className="text-center">
          <div className="text-lg font-bold tracking-wide text-slate-900 md:text-xl">
            {TITLE}
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="grid size-9 place-items-center rounded-full border border-slate-900/20 bg-white/70 text-base text-slate-900 transition hover:bg-white hover:scale-110 active:scale-95"
            aria-label="Cari buku"
            title="Cari buku"
          >
            🔍
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-slate-900/20 bg-white/70 text-base text-slate-900 transition hover:bg-white hover:scale-110 active:scale-95"
            aria-label="Bantuan"
            title="Tips & Bantuan"
            onClick={() => {
              alert(
                'Tips Cepat:\n\n🔍 Klik icon cari untuk cari judul buku\n📖 Buka "Semua Buku" untuk filter & sorting\n💬 Chatbot bisa kasih rekomendasi\n\nContoh tanya chatbot:\n• "Buku novel yang seru apa?"\n• "Rekomendasi buku motivasi"',
              )
            }}
          >
            ❓
          </button>
        </div>
      </div>
    </header>
  )
}


