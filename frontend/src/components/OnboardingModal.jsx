import { useState } from 'react'

const MOODS = [
  { id: 'seru', emoji: '🔥', label: 'Pengen yang seru', desc: 'Aksi, petualangan, thriller' },
  { id: 'relax', emoji: '😌', label: 'Lagi chill', desc: 'Cerita ringan, romantis' },
  { id: 'motivasi', emoji: '💪', label: 'Butuh motivasi', desc: 'Self-improvement, inspirasi' },
  { id: 'curious', emoji: '🤔', label: 'Pengen tahu', desc: 'Filsafat, biografi, sejarah' },
  { id: 'random', emoji: '🎲', label: 'Surprise me!', desc: 'Buku acak yang menarik' },
]

export function OnboardingModal({ open, onClose, onComplete }) {
  const [selectedMoods, setSelectedMoods] = useState([])

  function toggleMood(moodId) {
    setSelectedMoods((prev) =>
      prev.includes(moodId) ? prev.filter((id) => id !== moodId) : [...prev, moodId],
    )
  }

  function handleComplete() {
    if (selectedMoods.length > 0) {
      localStorage.setItem('user_moods', JSON.stringify(selectedMoods))
      localStorage.setItem('onboarding_complete', 'true')
      onComplete(selectedMoods)
    }
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="panel w-full max-w-lg rounded-3xl p-8 shadow-2xl ring-1 ring-black/10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-2xl text-slate-400 hover:bg-white/50 hover:text-slate-700 transition"
        >
          ✕
        </button>

        <div className="mb-6 text-center">
          <div className="mb-2 text-3xl">👋</div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Halo!</h2>
          <p className="text-sm text-slate-600">
            Pilih mood kamu hari ini. Kita akan kasih rekomendasi buku yang cocok!
          </p>
        </div>

        <div className="space-y-2">
          {MOODS.map((mood) => {
            const isSelected = selectedMoods.includes(mood.id)
            return (
              <button
                key={mood.id}
                onClick={() => toggleMood(mood.id)}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-lg scale-[1.02]'
                    : 'border-slate-200 bg-white/50 text-slate-900 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mood.emoji}</span>
                  <div className="flex-1">
                    <div className="font-semibold">{mood.label}</div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      {mood.desc}
                    </div>
                  </div>
                  {isSelected && <span className="text-lg">✓</span>}
                </div>
              </button>
            )
          })}
        </div>

        <button
          onClick={handleComplete}
          disabled={selectedMoods.length === 0}
          className="mt-6 w-full rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Lanjutkan →
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full text-sm text-slate-500 hover:text-slate-700"
        >
          Skip, langsung explore
        </button>
      </div>
    </div>
  )
}

