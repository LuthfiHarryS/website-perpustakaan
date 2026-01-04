const DEFAULT_BASE = 'https://bookcover.longitood.com'

function isPlaceholderCover(url) {
  if (!url) return true
  return String(url).includes('placehold.co')
}

async function getCoverUrlByTitleAuthor({
  baseUrl = process.env.BOOKCOVER_API_BASE || DEFAULT_BASE,
  judul,
  pengarang,
}) {
  if (!globalThis.fetch) {
    throw new Error(
      'Node.js fetch API not found. Please use Node.js 18+ (recommended LTS).',
    )
  }

  const bookTitle = String(judul || '').trim()
  const authorName = String(pengarang || '').trim()
  if (!bookTitle || !authorName) return null

  const url = new URL('/bookcover', baseUrl)
  url.searchParams.set('book_title', bookTitle)
  url.searchParams.set('author_name', authorName)

  const res = await fetch(url.toString())
  if (!res.ok) return null

  const data = await res.json().catch(() => null)
  const coverUrl = data?.url
  if (!coverUrl) return null
  return String(coverUrl)
}

module.exports = { getCoverUrlByTitleAuthor, isPlaceholderCover }




