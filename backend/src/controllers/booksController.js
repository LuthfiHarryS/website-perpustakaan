const mongoose = require('mongoose')
const Book = require('../models/Book')

function parseGenreParam(genreParam) {
  if (!genreParam) return null
  if (Array.isArray(genreParam)) return genreParam.flatMap((g) => String(g).split(','))
  return String(genreParam).split(',')
}

function buildSort(sort) {
  switch (sort) {
    case 'za':
      return { judul: -1 }
    case 'terbaru':
      return { tahun_terbit: -1, judul: 1 }
    case 'terlama':
      return { tahun_terbit: 1, judul: 1 }
    case 'az':
    default:
      return { judul: 1 }
  }
}

async function getRandomBooks(_req, res, next) {
  try {
    const books = await Book.aggregate([{ $sample: { size: 10 } }])
    res.json({ books })
  } catch (err) {
    next(err)
  }
}

async function getBooks(req, res, next) {
  try {
    const { sort = 'az' } = req.query
    const genres = parseGenreParam(req.query.genre)?.map((g) => g.trim()).filter(Boolean)

    const filter = {}
    if (genres && genres.length > 0) {
      filter.genre = { $in: genres }
    }

    const books = await Book.find(filter).sort(buildSort(sort)).lean()
    res.json({ books })
  } catch (err) {
    next(err)
  }
}

async function searchBooks(req, res, next) {
  try {
    const q = String(req.query.q || '').trim()
    if (!q) return res.json({ books: [] })

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    const books = await Book.find({ judul: { $regex: regex } })
      .sort({ judul: 1 })
      .limit(50)
      .lean()
    res.json({ books })
  } catch (err) {
    next(err)
  }
}

async function getBookById(req, res, next) {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid book id' })
    }

    const book = await Book.findById(id).lean()
    if (!book) return res.status(404).json({ error: 'Book not found' })

    res.json({ book })
  } catch (err) {
    next(err)
  }
}

module.exports = { getRandomBooks, getBooks, searchBooks, getBookById }


