import { Route, Routes } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import { Header } from './components/Header.jsx'
import { SearchModal } from './components/SearchModal.jsx'
import { OnboardingModal } from './components/OnboardingModal.jsx'
import { GENRES } from './constants/genres.js'

import { HomePage } from './pages/HomePage.jsx'
import { BooksPage } from './pages/BooksPage.jsx'
import { BookDetailPage } from './pages/BookDetailPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const genres = useMemo(() => GENRES, [])

  // Check onboarding status (privacy-friendly, hanya di localStorage)
  useEffect(() => {
    const completed = localStorage.getItem('onboarding_complete')
    if (!completed) {
      // Delay sedikit agar tidak langsung muncul (kurangi cognitive load)
      const timer = setTimeout(() => setOnboardingOpen(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleOnboardingComplete(moods) {
    // Bisa digunakan untuk personalisasi rekomendasi di masa depan
    console.log('User moods:', moods)
  }

  return (
    <div className="min-h-screen">
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        genres={genres}
      />
      <OnboardingModal
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage genres={genres} />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
