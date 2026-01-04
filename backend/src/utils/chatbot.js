const GENRES = [
  'Novel',
  'Pelajaran',
  'Biografi',
  'Self Improvement',
  'Filsafat',
  'Sejarah',
  'Agama',
]

const KEYWORD_TO_GENRE = [
  { keywords: ['novel', 'romance', 'fantasi', 'drama'], genre: 'Novel' },
  { keywords: ['pelajaran', 'mapel', 'belajar', 'sekolah'], genre: 'Pelajaran' },
  { keywords: ['biografi', 'tokoh', 'kisah hidup'], genre: 'Biografi' },
  {
    keywords: ['self improvement', 'pengembangan diri', 'motivasi', 'kebiasaan', 'produktif'],
    genre: 'Self Improvement',
  },
  { keywords: ['filsafat', 'filosofi'], genre: 'Filsafat' },
  { keywords: ['sejarah', 'historis'], genre: 'Sejarah' },
  { keywords: ['agama', 'islami', 'religius'], genre: 'Agama' },
]

function normalize(text) {
  return String(text || '').toLowerCase()
}

function detectGenreFromMessage(message) {
  const m = normalize(message)

  // 1) Exact genre mention (case-insensitive)
  for (const g of GENRES) {
    if (m.includes(g.toLowerCase())) return g
  }

  // 2) Keyword mapping
  for (const rule of KEYWORD_TO_GENRE) {
    if (rule.keywords.some((k) => m.includes(k))) return rule.genre
  }

  return null
}

function formatRecommendations(genre, books) {
  const lines = books.map((b, idx) => `${idx + 1}. ${b.judul} — ${b.pengarang}`)
  return `Aku rekomendasikan 5 buku genre ${genre} berikut:\n${lines.join('\n')}`
}

module.exports = { detectGenreFromMessage, formatRecommendations, GENRES }


