const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const Book = require('../src/models/Book')
const {
  getCoverUrlByTitleAuthor,
  isPlaceholderCover,
} = require('../src/services/bookcover')

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error(
      'MONGODB_URI is required. Set it in backend/.env (see backend/env.example).',
    )
  }

  await mongoose.connect(uri)

  const cursor = Book.find({}).cursor()
  let updated = 0
  let scanned = 0

  for await (const book of cursor) {
    scanned += 1
    if (!isPlaceholderCover(book.cover_url)) continue

    const coverUrl = await getCoverUrlByTitleAuthor({
      judul: book.judul,
      pengarang: book.pengarang,
    })
    if (!coverUrl) continue

    book.cover_url = coverUrl
    await book.save()
    updated += 1
    console.log(`Updated cover: ${book.judul} -> ${coverUrl}`)
  }

  console.log(`Done. Scanned ${scanned} books, updated ${updated} covers.`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})




