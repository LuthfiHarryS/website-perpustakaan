import { useState } from 'react'

// Koleksi tips untuk berbagai situasi
const ALL_TIPS = [
  {
    id: 'start-thin',
    emoji: '📖',
    title: 'Mulai dari buku tipis',
    content: 'Coba mulai dari buku tipis dulu (kurang dari 200 halaman). Setelah selesai, rasanya puas banget lho! 😎',
    color: 'bg-green-50 border-green-200 text-green-900',
  },
  {
    id: 'daily-habit',
    emoji: '📅',
    title: 'Baca sedikit setiap hari',
    content: 'Lebih baik baca 10 halaman setiap hari daripada 100 halaman sekali duduk. Konsistensi kuncinya! 💪',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
  },
  {
    id: 'explore-genres',
    emoji: '🎯',
    title: 'Jangan stuck di 1 genre',
    content: 'Coba explore berbagai genre! Novel seru, buku motivasi, atau biografi menarik. Siapa tahu nemu genre favorit baru! 🌟',
    color: 'bg-purple-50 border-purple-200 text-purple-900',
  },
  {
    id: 'find-quiet',
    emoji: '🔇',
    title: 'Cari tempat yang nyaman',
    content: 'Baca di tempat yang tenang dan nyaman. Matiin HP atau mode silent biar fokus. Trust me, lebih efektif! 🧘',
    color: 'bg-amber-50 border-amber-200 text-amber-900',
  },
  {
    id: 'take-notes',
    emoji: '✍️',
    title: 'Catat hal menarik',
    content: 'Kalau nemu quote atau ide menarik, catat! Bisa jadi bahan refleksi atau bahan diskusi sama temen nanti. 📝',
    color: 'bg-pink-50 border-pink-200 text-pink-900',
  },
  {
    id: 'discuss',
    emoji: '💬',
    title: 'Diskusi sama temen',
    content: 'Udah baca buku yang sama dengan temen? Diskusiin deh! Sharing perspektif itu seru banget dan bikin lebih paham. 🗣️',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
  },
  {
    id: 'break-time',
    emoji: '☕',
    title: 'Jangan lupa istirahat',
    content: 'Setiap 30-45 menit, istirahat 5 menit. Stretch, minum air, atau jalan-jalan sebentar. Otak juga butuh break! 🚶',
    color: 'bg-teal-50 border-teal-200 text-teal-900',
  },
  {
    id: 'chatbot-help',
    emoji: '🤖',
    title: 'Gunakan chatbot',
    content: 'Bingung mau baca apa? Tanya chatbot aja! Contoh: "Rekomendasi buku motivasi" atau "Buku novel yang seru apa?" 💬',
    color: 'bg-slate-50 border-slate-200 text-slate-900',
  },
]

// Tips khusus berdasarkan kondisi
export const CONDITIONAL_TIPS = {
  longBook: {
    emoji: '📚',
    title: 'Buku panjang? No problem!',
    content: 'Buku ini agak panjang tapi jangan takut! Coba bagi jadi target harian. Misalnya 50 halaman/hari, dalam seminggu selesai! 📖✨',
    color: 'bg-amber-50 border-amber-200 text-amber-900',
  },
  shortBook: {
    emoji: '⚡',
    title: 'Buku tipis nih!',
    content: 'Buku ini relatif tipis, perfect buat baca sekali duduk atau dalam 1-2 hari. Perfect untuk mulai habit membaca! 🎯',
    color: 'bg-green-50 border-green-200 text-green-900',
  },
  philosophy: {
    emoji: '🤔',
    title: 'Buku filsafat',
    content: 'Buku filsafat memang butuh waktu. Baca pelan-pelan, resapi setiap ide. Kalau bingung, baca ulang bagian yang penting! 🧠',
    color: 'bg-purple-50 border-purple-200 text-purple-900',
  },
  biography: {
    emoji: '👤',
    title: 'Biografi inspiratif',
    content: 'Biografi ini bisa kasih insight tentang perjalanan hidup seseorang. Coba refleksikan: "Apa yang bisa dipelajari?" 💭',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
  },
}

export function TipsSection({ variant = 'random', tips = null }) {
  // Jika variant = 'random', tampilkan 1-2 tips random
  // Jika variant = 'all', tampilkan semua tips
  // Jika tips diberikan, tampilkan tips tersebut

  const [displayedTips, setDisplayedTips] = useState(() => {
    if (tips) return Array.isArray(tips) ? tips : [tips]
    if (variant === 'all') return ALL_TIPS
    // Random 1-2 tips
    const shuffled = [...ALL_TIPS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, variant === 'single' ? 1 : 2)
  })

  if (displayedTips.length === 0) return null

  return (
    <div className="space-y-4">
      {displayedTips.map((tip) => (
        <div
          key={tip.id || tip.title}
          className={`panel rounded-2xl border-2 p-4 shadow-sm ${tip.color || 'bg-slate-50 border-slate-200'}`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-2xl">{tip.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="mb-1 font-semibold">{tip.title}</div>
              <p className="text-sm leading-relaxed">{tip.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

