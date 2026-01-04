import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

<<<<<<< HEAD
const TITLE = 'Perpustakaan SMAN'
=======
const TITLE = 'Perpustakaan SMAN ...'
>>>>>>> abf20ec (Update: Perbaikan UI dan penambahan komponen TipsSection serta dokumentasi onboarding)

export function Header({ onOpenSearch, onOpenOnboarding }) {
  const location = useLocation()
  const [showHelpMenu, setShowHelpMenu] = useState(false)

  function handleHelpClick() {
    setShowHelpMenu((prev) => !prev)
  }

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

        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="grid size-9 place-items-center rounded-full border border-slate-900/20 bg-white/70 text-base text-slate-900 transition hover:bg-white hover:scale-110 active:scale-95"
            aria-label="Cari buku"
            title="Cari buku"
          >
            🔍
          </button>
          
          {/* Help button with dropdown menu */}
          <div className="relative">
            <button
              type="button"
              onClick={handleHelpClick}
              className="grid size-9 place-items-center rounded-full border border-slate-900/20 bg-white/70 text-base text-slate-900 transition hover:bg-white hover:scale-110 active:scale-95"
              aria-label="Bantuan"
              title="Bantuan"
            >
              ❓
            </button>

            {/* Dropdown menu */}
            {showHelpMenu && (
              <>
                {/* Backdrop untuk tutup menu saat klik di luar */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowHelpMenu(false)}
                />
                <div className="absolute right-0 top-12 z-20 w-64 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/10">
                  <button
                    onClick={() => {
                      setShowHelpMenu(false)
                      alert(
                        'Tips Cepat:\n\n🔍 Klik icon cari untuk cari judul buku\n📖 Buka "Semua Buku" untuk filter & sorting\n💬 Chatbot bisa kasih rekomendasi\n\nContoh tanya chatbot:\n• "Buku novel yang seru apa?"\n• "Rekomendasi buku motivasi"',
                      )
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <div className="font-semibold">💡 Tips & Bantuan</div>
                    <div className="text-xs text-slate-500">Cara menggunakan website</div>
                  </button>
                  
                  {onOpenOnboarding && (
                    <button
                      onClick={() => {
                        setShowHelpMenu(false)
                        onOpenOnboarding()
                      }}
                      className="mt-1 w-full rounded-xl px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <div className="font-semibold">🎯 Ubah Preferensi</div>
                      <div className="text-xs text-slate-500">Pilih mood baca kamu lagi</div>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}


