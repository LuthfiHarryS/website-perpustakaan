const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const Book = require('../src/models/Book')
const {
  getCoverUrlByTitleAuthor,
  isPlaceholderCover,
} = require('../src/services/bookcover')

function truthyEnv(name) {
  const v = String(process.env[name] || '').trim().toLowerCase()
  return v === '1' || v === 'true' || v === 'yes' || v === 'y'
}

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error(
      'MONGODB_URI is required. Set it in backend/.env (see backend/env.example).',
    )
  }

  const dataPath = path.join(__dirname, '..', 'data', 'books.sample.json')
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const books = JSON.parse(raw)

  const shouldFetchCovers = truthyEnv('SEED_FETCH_COVERS')
  if (shouldFetchCovers) {
    for (const b of books) {
      if (!isPlaceholderCover(b.cover_url)) continue
      const coverUrl = await getCoverUrlByTitleAuthor({
        judul: b.judul,
        pengarang: b.pengarang,
      })
      if (coverUrl) b.cover_url = coverUrl
    }
  }

  await mongoose.connect(uri)

  await Book.deleteMany({})
  await Book.insertMany(books)

  console.log(`Seeded ${books.length} books`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


