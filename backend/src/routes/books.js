const express = require('express')
const {
  getRandomBooks,
  getBooks,
  searchBooks,
  getBookById,
} = require('../controllers/booksController')

const router = express.Router()

// GET /api/books/random -> 10 random books
router.get('/random', getRandomBooks)

// GET /api/books?genre=Novel&sort=az|za|terbaru|terlama
router.get('/', getBooks)

// GET /api/books/search?q=judul
router.get('/search', searchBooks)

// GET /api/books/:id
router.get('/:id', getBookById)

module.exports = router


